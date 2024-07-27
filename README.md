# OrbitalClustering

Clustering of Twitter Networks with Orbital Signature Embeddings

### Install

To reproduce the results, you can run the following commands:

```bash
git clone https://github.com/roicort/OrbitalClustering
cd OrbitalClustering
pip install -r requirements.txt
```

### Preprocess

Preproces edges
```bash
python main.py --preprocessing 
```

Count orbits

```bash
python main.py --precompute --threads 4
```

### First Embedding

Get K

```bash
python main.py --optimKE
```

Get the stability of the users caracterization (Embedding)

```bash
python main.py --stabilityE
```

Get User's embedding

```bash
python main.py --embedding
```

### Second Embedding

```bash
python main.py --optimKC
```

```bash
python main.py --stabilityC
```

```bash
python main.py --clustering
```

### Post Process (Optional)

```bash
python main.py --correlations
```

```bash
python main.py --audit
```

```bash
python main.py --colornetworks
```

```bash
python main.py --viewsignature
```

```bash
python main.py --viewcomposition
```

# Discussion (Spanish)

See https://roicort.github.io/OrbitalClustering/docs/tesis/discusion

# Results

See https://roicort.github.io/OrbitalClustering/explore

![](https://raw.githubusercontent.com/roicort/OrbitalClustering/main/tesis-latex/figures/orbits.svg)
