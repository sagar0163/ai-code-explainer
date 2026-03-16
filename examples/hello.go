package main

import "fmt"

func main() {
    // Create a channel for communication
    ch := make(chan string)

    // Start a goroutine
    go func() {
        ch <- "Hello from goroutine!"
    }()

    // Receive message
    msg := <-ch
    fmt.Println(msg)
}

// Example function with error handling
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}
