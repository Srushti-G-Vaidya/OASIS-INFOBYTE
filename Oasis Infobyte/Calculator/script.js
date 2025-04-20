const result = document.getElementById('result');
    const buttons = document.querySelectorAll('.btn');

   
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        handleInput(button.getAttribute('data-value'));
      });
    });

    
    document.addEventListener('keydown', (event) => {
      const key = event.key;
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Backspace', 'Delete', 'c', 'C'];

      if (allowedKeys.includes(key)) {
        event.preventDefault();

        if (key === 'Enter') {
          handleInput('=');
        } else if (key === 'Backspace') {
          handleInput('DEL');
        } else if (key === 'Delete' || key === 'c' || key === 'C') {
          handleInput('C');
        } else {
          handleInput(key);
        }
      }
    });

    
    function handleInput(value) {
      if (value === 'C') {
        result.value = '';
      } else if (value === 'DEL') {
        result.value = result.value.slice(0, -1);
      } else if (value === '=') {
        try {
          const expression = result.value.replace(/×/g, '*').replace(/÷/g, '/'); 
          result.value = eval(expression) || '0';
        } catch (error) {
          result.value = 'Error';
          setTimeout(() => (result.value = ''), 1500);
        }
      } else {
        result.value += value;
      }

      result.classList.add('display-update');
      setTimeout(() => result.classList.remove('display-update'), 100);
    }