function retrieveUsers() {
    fetch("/api/users")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((user) => {
                console.log(user)
                this.addMarker(user.username, user.lat, user.long);
            });
        });
}

