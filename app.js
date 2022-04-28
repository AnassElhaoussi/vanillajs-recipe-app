
const fetchData = () => {
    fetch("https://themealdb.com/api/json/v1/1/categories.php").then(res => {
        return res.json()
    }).then(data => {
        console.log(data);
    })
}

fetchData()