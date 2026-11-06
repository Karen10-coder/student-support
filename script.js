const form = document.getElementById("request-form");
const list = document.getElementById("request-list");
let requests = JSON.parse(localStorage.getItem("requests")) || [];
function nextStatus(index) {
    if (requests[index].status === "Submitted") {
        requests[index].status = "In Progress";
    } else if (requests[index].status === "In Progress") {
        requests[index].status = "Resolved";
    }
    localStorage.setItem("requests", JSON.stringify(requests));
    showRequests();
}
    function showRequests() {
        list.innerHTML = "";
        requests.forEach(function (req, index) {
            const li = document.createElement("li");
            li.textContent = req.name + " | " + req.type + " | " + req.message + " | Status: " + req.status + " ";
            if (req.status !== "Resolved") {
                const btn = document.createElement("button");
                btn.textContent = "Update status";
                btn.addEventListener("click", function () {
                    nextStatus(index);

                });
                li.appendChild(btn);
            }
        list.appendChild(li);
    });
}
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const type = document.getElementById("type").value;
    const message = document.getElementById("message").value.trim();
    if (name === "" || type === "" || message === "") {
        alert("Please fill in all fields");
        return;
    }
    requests.push({name: name, type: type, message: message, status: "Submitted"});
    localStorage.setItem("requests", JSON.stringify(requests));
    form.reset();
    showRequests();
});
showRequests();