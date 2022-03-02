import shutil
from wasabi import msg

from preprocessing import graph2edges
from runner import parallelrunnerGC

from embedding import OptKEmbedding, GetStabilityEmbedding, UsersMiniBatchKMeansEmbedding
from clustering import OptKClustering, GetStabilityClustering, UsersDendrogramClustering 

from utils import ColorNetworks, AuditCentroids
from correlations import GraphletCorrelations

########################################################################

#Preprocessing

#if graph2edges('../datasets/Tweemes','input/'):
#    msg.good("Preprocessing Done")

########################################################################

#PreCompute

#if parallelrunnerGC('input/','logs/',threads=24):
#    msg.good("Parallel precompute done")

########################################################################

## First Clustering (Users Caracterization)

#if OptKEmbedding("input/","stability/"):
#    msg.good("GAP Users Done")

#if GetStabilityEmbedding("input/","stability/",runs=50,K=5):
#    msg.good("Embedding Stability Done")

#if UsersMiniBatchKMeansEmbedding("input/","embeddings/",K=5):
#    msg.good("KMeans Embedding Done!")

## Second Clustering (Graph Clustering)

#if OptKClustering("embeddings/5-MiniBatchUsersEmbedding.csv","stability/"):
#    msg.good("GAP Graphs Done")

#if GetStabilityClustering("embeddings/5-MiniBatchUsersEmbedding.csv","stability/",runs=50,K=3):
#    msg.good("NetworkClustering Stability Done")

#if UsersDendrogramClustering("embeddings/5-MiniBatchUsersEmbedding.csv","dendrograms/"):
#    msg.good("Dendrogram Done")

#if UsersDendrogramClustering("embeddings/5-NormMiniBatchUsersEmbedding.csv","dendrograms/", name = "Norm"):
#    msg.good("Dendrogram Norm Done")

########################################################################

#GraphletCorrelations("input/","correlations/")

#AuditCentroids("embeddings/5-CentroidsMiniBatchEmbedding.out")

#ColorNetworks("input/","embeddings/5-CompleteMiniBatchUsers.csv","colored/")


