import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.png';

function App() {
  const [precioPorHora, setPrecioPorHora] = useState(0);
  const [horas, setHoras] = useState(0);
  const [personas, setPersonas] = useState(0);
  const [gastosAdicionales, setGastosAdicionales] = useState(0);
  const [porcentajeRiesgo, setPorcentajeRiesgo] = useState(0);
  const [costosInfraestructura, setCostosInfraestructura] = useState(0);
  const [viaticos, setViaticos] = useState(0);
  const [resultados, setResultados] = useState(undefined);

  useEffect(() => {
    if (precioPorHora < 0 || horas < 0 || personas < 0 || gastosAdicionales < 0 || costosInfraestructura < 0 || viaticos < 0 || porcentajeRiesgo < 0) {
      alert("Todos los valores deben ser mayores o iguales a 0");
      return;
    }

    if (porcentajeRiesgo > 50) {
      alert("El porcentaje de riesgo no puede superar el 50%");
      return;
    }

    if (!Number.isInteger(Number(personas))){
      alert("El número de personas debe ser un número entero");
      return;
    }

    const costoEsfuerzo = parseFloat(precioPorHora) * parseFloat(horas) * personas;
    const costoTotal = costoEsfuerzo + parseFloat(gastosAdicionales) + parseFloat(costosInfraestructura) + parseFloat(viaticos);
    const costoTotalConRiesgo = costoTotal + (porcentajeRiesgo / 100) * costoTotal;
    const retencion = costoTotalConRiesgo * 0.11;
    const reteica = retencion * 0.01;
    const iva = (costoTotalConRiesgo + retencion + reteica) * 0.19;
    const costoFinal = costoTotalConRiesgo + retencion + reteica + iva;

    setResultados({
      costoEsfuerzo,
      costoTotal,
      costoTotalConRiesgo,
      retencion,
      reteica,
      iva,
      costoFinal
    });
  }, [
    precioPorHora,
    horas,
    personas,
    gastosAdicionales,
    porcentajeRiesgo,
    costosInfraestructura,
    viaticos,
    resultados
  ]);

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="logo" />
      <h1>
        <span>Calculadora de costos de</span>
        <span>Desarrollo de Software</span>
      </h1>
      <div className="content">
        <form>
          <div className="form-group">
            <label>Precio por hora:</label>
            <input type="number" value={precioPorHora} onChange={(e) => setPrecioPorHora(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Número de horas:</label>
            <input type="number" value={horas} onChange={(e) => setHoras(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Número de personas:</label>
            <input type="number" value={personas} onChange={(e) => setPersonas(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Gastos adicionales:</label>
            <input type="number" value={gastosAdicionales} onChange={(e) => setGastosAdicionales(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Costos de infraestructura:</label>
            <input type="number" value={costosInfraestructura} onChange={(e) => setCostosInfraestructura(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Viáticos:</label>
            <input type="number" value={viaticos} onChange={(e) => setViaticos(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Porcentaje de riesgo:</label>
            <input type="number" value={porcentajeRiesgo} onChange={(e) => setPorcentajeRiesgo(e.target.value)} />
          </div>
        </form>
        {resultados && (
          <div className="resultados">
            <h2>Resultados</h2>
            <p>Costo de Esfuerzo: ${resultados.costoEsfuerzo.toFixed(2)}</p>
            <p>Costo total (antes de riesgos e impuestos): ${resultados.costoTotal.toFixed(2)}</p>
            <p>Costo total con riesgo: ${resultados.costoTotalConRiesgo.toFixed(2)}</p>
            <p>Retención en la fuente: ${resultados.retencion.toFixed(2)}</p>
            <p>Reteica: ${resultados.reteica.toFixed(2)}</p>
            <p>IVA: ${resultados.iva.toFixed(2)}</p>
            <p>Costo Final: ${resultados.costoFinal.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;