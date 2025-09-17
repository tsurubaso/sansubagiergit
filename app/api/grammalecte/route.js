async function checkText(text) {
  const response = await fetch("https://tsurubaso.pythonanywhere.com/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  return await response.json();
}

// Exemple
checkText("Je vais au ecole.").then(errors => {
  console.log(errors);
});