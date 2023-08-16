import shutil
from wasabi import msg

from preprocessing import graph2edges
from runner import parallelrunnerGC, runnerGC

from embedding import OptKEmbedding, GetStabilityEmbedding, UsersMiniBatchKMeansEmbedding
from clustering import OptKClustering, GetStabilityClustering, UsersDendrogramClustering 

from utils import ColorNetworks, AuditCentroids, GraphletCorrelations, ViewSignature, ViewComposition

from radicli import Radicli, Arg

########################################################################

#Radical CLI

cli = Radicli()

########################################################################

#Preprocessing

@cli.command(
    "preprocessing",
    inputt=Arg("--input", "-i", help="Input Directory"),
    outputt=Arg("--output", "-o", help="Output Directory"),
)

def preprocessing(inputt: str = 'input/', outputt: str = 'input/'):
    if graph2edges(inputt,output):
        msg.good("Preprocessing Done")

########################################################################

#PreCompute

@cli.command(
    "precompute",
    inputt=Arg("--input", "-i", help="Input Directory"),
    logss=Arg("--logs", "-l", help="Logs Directory"),
    threadss=Arg("--threads", "-t", help="Number of Threads"),
)

def precompute(inputt: str = 'input/', logss: str = 'logs/', threadss: int = 4):
    if parallelrunnerGC(inputt,logss,threads=threadss):
        msg.good("Parallel precompute done")

########################################################################

## First Clustering (Users Caracterization)

@cli.command(
    "optimKE",
    inputt=Arg("--input", "-i", help="Input Directory"),
    outputt=Arg("--output", "-o", help="Output Directory"),
)

def optimKE(inputt: str = 'input/', outputt: str = 'stability/'):
    if OptKEmbedding(inputt,outputt):
        msg.good("GAP Users Done")

@cli.command(
    "stabilityE",
    inputt=Arg("--input", "-i", help="Input Directory"),
    outputt=Arg("--output", "-o", help="Output Directory"),
    runss=Arg("--runs", "-r", help="Number of Runs"),
    K=Arg("--K", "-k", help="Number of Clusters"),
)

def stabilityE(inputt: str = 'input/', outputt: str = 'stability/', runss: int = 50, K: int = 5):
    if GetStabilityEmbedding(inputt,outputt,runs=runss,K=K):
        msg.good("Embedding Stability Done")

@cli.command(
    "embedding",
    inputt=Arg("--input", "-i", help="Input Directory"),
    outputt=Arg("--output", "-o", help="Output Directory"),
    K=Arg("--K", "-k", help="Number of Clusters"),
)

def embedding(inputt: str = 'input/', outputt: str = 'embeddings/', K: int = 5):
    if UsersMiniBatchKMeansEmbedding(inputt,outputt,K=K):
        msg.good("KMeans Embedding Done")       

########################################################################

## Second Clustering (Graph Clustering)

@cli.command(
    "optimKC",
    inputt=Arg("--input", "-i", help="Input Directory"),
    outputt=Arg("--output", "-o", help="Output Directory"),
)

def optimKC(inputt: str = 'embeddings/5-NormMiniBatchUsersEmbedding.csv', outputt: str = 'clustering/'):
    if OptKClustering(inputt,outputt):
        msg.good("GAP Graphs Done")

@cli.command(
    "stabilityC",
    inputt=Arg("--input", "-i", help="Input Directory"),
    outputt=Arg("--output", "-o", help="Output Directory"),
    runss=Arg("--runs", "-r", help="Number of Runs"),
    K=Arg("--K", "-k", help="Number of Clusters"),
)

def stabilityC(inputt: str = 'embeddings/5-NormMiniBatchUsersEmbedding.csv', outputt: str = 'clustering/', runss: int = 50, K: int = 5):
    if GetStabilityClustering(inputt,outputt,runs=runss,K=K):
        msg.good("NetworkClustering Stability Done")

@cli.command(
    "clustering",
    inputt=Arg("--input", "-i", help="Input Directory"),
    outputt=Arg("--output", "-o", help="Output Directory"),
    K=Arg("--K", "-k", help="Number of Clusters"),
)

def clustering(inputt: str = 'embeddings/5-NormMiniBatchUsersEmbedding.csv', outputt: str = 'clustering/', K: int = 5):
    if UsersDendrogramClustering(inputt,outputt,K=K):
        msg.good("Dendrogram Done")

########################################################################

#PostProcessing

@cli.command(
    "correlations",
    inputt=Arg("--input", "-i", help="Input Directory"),
    outputt=Arg("--output", "-o", help="Output Directory"),
)

def correlations(inputt: str = 'input/', outputt: str = './'):
    GraphletCorrelations(inputt,outputt)

@cli.command(
    "audit",
    inputt=Arg("--input", "-i", help="Input Directory"),
)

def audit(inputt: str = 'embeddings/5-CentroidsMiniBatchEmbedding.out'):
    AuditCentroids(inputt)

@cli.command(
    "colornetworks",
    inputt=Arg("--input", "-i", help="Input Directory"),
    clusterss=Arg("--clusters", "-c", help="Clusters File"),
    outputt=Arg("--output", "-o", help="Output Directory"),
)

def colornetworks(inputt: str = 'input/', clusterss: str = 'embeddings/5-CompleteMiniBatchUsers.csv', outputt: str = 'colored/'):
    ColorNetworks(inputt,clusterss,outputt)

@cli.command(
    "viewsignature",
    inputt=Arg("--input", "-i", help="Input Directory"),
    outputt=Arg("--output", "-o", help="Output Directory"),
)

def viewsignature(inputt: str = 'input/', outputt: str = 'input/'):
    ViewSignature(inputt,outputt)

@cli.command(
    "viewcomposition",
    inputt=Arg("--input", "-i", help="Input Directory"),
    outputt=Arg("--output", "-o", help="Output Directory"),
)

def viewcomposition(inputt: str = 'embeddings/', outputt: str = 'embeddings/'):
    ViewComposition(inputt,outputt)

########################################################################

if __name__ == "__main__":
    cli.run()