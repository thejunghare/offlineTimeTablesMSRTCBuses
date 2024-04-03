package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Stop struct {
	Name string `json:"name"`
	Fare string `json:"fare"`
	Time string `json:"time"`
}

type Bus struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Source      string `json:"source"`
	Destination string `json:"destination"`
	Stops       []Stop `json:"stops"`
}

func fooHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, world!")
}

func main() {
	// Fetch data from GitHub Pages
	resp, err := http.Get("https://thejunghare.github.io/offlineTimeTablesMSRTCBuses/data.json")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	var data []Bus
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		panic(err)
	}

	http.HandleFunc("/foo", fooHandler)

	// Define a handler function for the "/buses" endpoint
	http.HandleFunc("/buses", func(w http.ResponseWriter, r *http.Request) {
		// Extract source and destination from the URL query parameters
		source := r.URL.Query().Get("source")
		destination := r.URL.Query().Get("destination")

		// Define a struct to represent the result
		type BusResult struct {
			Name string `json:"name"`
			Fare string `json:"fare"`
			Time string `json:"time"`
		}

		// Initialize an empty slice to store the results
		var results []BusResult

		// Iterate over each bus in the data
		for _, bus := range data {
			// Initialize variables to store the indices of source and destination stops
			sourceIndex, destinationIndex := -1, -1

			// Iterate over the stops of the current bus to find the source and destination stops
			for i, stop := range bus.Stops {
				if stop.Name == source {
					sourceIndex = i
				}
				if stop.Name == destination {
					destinationIndex = i
				}
			}

			// If both source and destination stops are found and in the correct order
			if sourceIndex != -1 && destinationIndex != -1 && sourceIndex < destinationIndex {
				// Append the result to the results slice
				results = append(results, BusResult{
					Name: bus.Name,
					Fare: bus.Stops[destinationIndex].Fare,
					Time: bus.Stops[sourceIndex].Time,
				})
			}
		}

		// If no results were found, return a 404 error
		if len(results) == 0 {
			http.Error(w, `{"error": "No bus found"}`, http.StatusNotFound)
			return
		}

		// Encode the results slice to JSON and send it in the response
		json.NewEncoder(w).Encode(results)
	})

	http.ListenAndServe(":8080", nil)
}
