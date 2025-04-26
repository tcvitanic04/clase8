const filas = document.querySelector("tbody");
const texto = document.querySelector("#promedio");

async function notas() {
    let total = 0;
    let consulta = await fetch("https://raw.githubusercontent.com/profesorfaco/opr/refs/heads/main/clase-08/notas.json");
    let data = await consulta.json();
    
    filas.innerHTML = "";
    
    data.forEach((d) => {
        filas.innerHTML += `
            <tr>
                <td>${d.nombre}</td>
                <td>${d.nota.toFixed(1)}</td>
                <td>${barrita(d.nota)}</td>
                <td>${carita(d.nota)}</td>
            </tr>`;
        total += d.nota;
    });
    
    texto.textContent = (total/12).toFixed(1);
}

function carita(n) {
    if (n > 5.9) return "🤠";
    if (n == 5.9) return "🤓";
    return "🫨";
}

function barrita(n) {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 12">
        <rect fill="#D9DCD1" width="70" height="12" rx="2"/>
        <rect fill="#DCF763" width="${n * 10}" height="12" rx="2"/>
        <text x="35" y="9" font-size="8" fill="#141515" 
              font-family="rubik" text-anchor="middle">
            ${n.toFixed(1)}
        </text>
    </svg>`;
}

notas().catch((error) => console.error(error));