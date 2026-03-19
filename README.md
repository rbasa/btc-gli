# 📊 Trabajo Final 

Este proyecto contiene el análisis econométrico para el trabajo final de la **Maestría en Finanzas** (UTDT).

---

## 🧱 Requisitos

- Python 3.9 o superior
- Cursor (recomendado) o VS Code
- (Opcional) Jupyter Notebook/Lab si lo querés correr en el navegador

---

## ⚙️ Configuración del ambiente (venv + kernel)

### 1. Crear el entorno virtual
```bash
python -m venv .venv
```

### 2. Activar el entorno virtual

macOS / Linux:

```bash
source .venv/bin/activate
```


### 3. Instalar dependencias
```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### 4. Crear un kernel de Jupyter para el notebook
Esto hace que Cursor/Jupyter puedan seleccionar el kernel por nombre.

```bash
python -m ipykernel install --user --name tpfinal --display-name "TPFinal (.venv)"
```

---

## 🚀 Cómo ejecutar el notebook

### Opción A: Desde Cursor (recomendado)
- Abrí la carpeta del proyecto (`TPFinal/`) en Cursor
- Abrí `tpf.ipynb`
- Cuando te pida kernel:
  - Elegí **Python Environment**
  - Seleccioná **`TPFinal (.venv)`** (kernel `tpfinal`)

Si **no aparece** en la lista:
- Elegí **“Enter interpreter path…”** / **“Select at path…”**
- Pegá el intérprete del venv:
  - `.../TPFinal/.venv/bin/python` (macOS/Linux)
  - `...\TPFinal\.venv\Scripts\python.exe` (Windows)

### Opción B: Desde Jupyter Notebook/Lab (navegador)
```bash
source .venv/bin/activate
jupyter lab
```

Luego en el notebook elegí el kernel **`TPFinal (.venv)`**.

### Opción 3: Verificar kernels disponibles
```bash
jupyter kernelspec list
```

---

## 📋 Estructura del Proyecto

```
TPFinal/
├── tpf.ipynb             # Notebook principal
├── data/                 # Datos (si aplica)
├── requirements.txt      # Dependencias Python
└── README.md             # Este archivo
```

## 🔧 Solución de Problemas

### Si el kernel no aparece:
```bash
# Verificar que el kernel esté instalado
jupyter kernelspec list

# Reinstalar el kernel si es necesario
python -m ipykernel install --user --name tpfinal --display-name "TPFinal (.venv)" --force
```

### Si faltan librerías:
```bash
# Activar el entorno virtual
source .venv/bin/activate

# Instalar librerías faltantes
python -m pip install [nombre_libreria]
```
---

