package main

import (
	"encoding/json"
	"net/http"
)

type Bus struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Source      string `json:"source"`
	Destination string `json:"destination"`
	Time        string `json:"time"`
	Fare        string `json:"fare"`
}

var data = []Bus{
	{
		ID:          1,
		Name:        "Satara - Sajjangad",
		Source:      "Satara",
		Destination: "Sajjangad",
		Time:        "10:00 AM",
		Fare:        "₹25",
	},
	{
		ID:          2,
		Name:        "Satara - Sajjangad",
		Source:      "Satara",
		Destination: "Sajjangad",
		Time:        "01:00 PM",
		Fare:        "₹25",
	},
	{
		ID:          3,
		Name:        "Medha - Kurla",
		Source:      "Medha",
		Destination: "Kurla",
		Time:        "01:00 PM",
		Fare:        "₹25",
	},
}

func main() {
	http.HandleFunc("/buses", func(w http.ResponseWriter, r *http.Request) {
		source := r.URL.Query().Get("source")
		destination := r.URL.Query().Get("destination")

		var result []Bus
		for _, bus := range data {
			if bus.Source == source && bus.Destination == destination {
				result = append(result, bus)
			}
		}
		json.NewEncoder(w).Encode(result)
	})

	http.ListenAndServe(":8080", nil)
}
