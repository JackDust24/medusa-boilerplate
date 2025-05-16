(function () {
  // Try to find a container by ID or fallback to body
  const container =
    document.getElementById('widget-container') || document.body;

  // Create the button
  const button = document.createElement('button');
  button.innerText = '🛍️ Enter Store';
  button.style.padding = '10px 20px';
  button.style.backgroundColor = '#2563eb';
  button.style.color = '#fff';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';
  button.style.fontSize = '16px';
  button.style.marginTop = '20px';

  button.onclick = function () {
    const token = 'fakeToken123'; // Replace later with real token
    const returnUrl = encodeURIComponent(window.location.href);
    const storefrontUrl = `http://localhost:8000?token=${token}&returnUrl=${returnUrl}`;
    window.location.href = storefrontUrl;
  };

  // Add an optional label above the button
  const label = document.createElement('p');
  label.innerText = 'Click below to launch your store:';
  label.style.fontSize = '18px';
  label.style.fontWeight = 'bold';
  label.style.marginBottom = '10px';

  container.appendChild(label);
  container.appendChild(button);
})();
