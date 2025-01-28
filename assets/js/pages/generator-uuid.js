document.addEventListener("DOMContentLoaded", () => {
    const generateUuidButton = document.getElementById("generate-uuid-btn");
    const uuidResult = document.getElementById("uuid-result");
  
    generateUuidButton.addEventListener("click", () => {
      const uuid = generateUUID();
      uuidResult.textContent = uuid;
    });
  
    function generateUUID() {
      // Gera um UUID v4 aleatório
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  });
  