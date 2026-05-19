let currentChat = null;

// 监听所有会话
db.ref("chats").on("value", snap => {
  const data = snap.val();
  const list = document.getElementById("list");

  list.innerHTML = "";

  for (let id in data) {
    const div = document.createElement("div");
    div.innerText = id;

    div.onclick = () => loadChat(id);

    list.appendChild(div);
  }
});

function loadChat(id) {
  currentChat = id;

  document.getElementById("box").innerHTML = "";

  db.ref("chats/" + id + "/messages").on("child_added", snap => {
    const msg = snap.val();

    const div = document.createElement("div");
    div.innerText = msg.sender + ": " + msg.text;

    document.getElementById("box").appendChild(div);
  });
}

function send() {
  const text = document.getElementById("reply").value;

  db.ref("chats/" + currentChat + "/messages").push({
    sender: "admin",
    text: text,
    time: Date.now()
  });
}