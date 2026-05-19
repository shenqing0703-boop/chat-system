const chatId = localStorage.getItem("chatId") || "chat_" + Date.now();
localStorage.setItem("chatId", chatId);

const ref = db.ref("chats/" + chatId + "/messages");

function sendMsg() {
  const text = document.getElementById("msg").value;
  if (!text) return;

  ref.push({
    sender: "user",
    text: text,
    time: Date.now()
  });

  document.getElementById("msg").value = "";
}

ref.on("child_added", snap => {
  const msg = snap.val();

  const div = document.createElement("div");
  div.innerText = msg.sender + ": " + msg.text;

  document.getElementById("chat").appendChild(div);
});