from scipy import cluster
from wasabi import msg
from tqdm import tqdm
import os
import pandas as pd
import numpy as np

from sklearn.cluster import KMeans, MiniBatchKMeans
from sklearn.manifold import TSNE
from sklearn import preprocessing as skp

from yellowbrick.cluster import KElbowVisualizer

import matplotlib.pyplot as plt
import seaborn as sns

import plotly as py
import plotly.graph_objs as go
import plotly.figure_factory as ff
import plotly.express as px

import scipy.spatial.distance as ssd
import scipy.stats as stats
from scipy.cluster import hierarchy as h

import networkx as nx

from sklearn.metrics.cluster import normalized_mutual_info_score

from gap_statistic import OptimalK

##############################################################################################################################

def AuditCentroids(centroids_path):

    X = np.loadtxt(centroids_path,delimiter=",")
    for c in X:
        aux = sorted(enumerate(c),reverse=True, key=lambda x:x[1])
        print(aux)

def ColorNetworks(read_path,users_path,save_path):

    files = []

    for r, _, f in os.walk(read_path):
        for file in f:
            if '.edges.dictionary.txt' in file:
                files.append([os.path.join(r, file),file.replace(".edges.dictionary.txt","")])
    files.sort()

    msg.info("Preprocessing Dicts")

    X = pd.read_csv(users_path)
    X.columns =['Key','Network','Cluster']

    msg.info("Parsing...")

    for file in tqdm(range(len(files))):
        path = files[file][0]
        name = files[file][1]

        dt = pd.read_csv(path,header= None,sep = " ")
        dt.columns =['Index','Values']
        dictionary = pd.Series(dt["Values"].values,index=dt["Index"]).to_dict()

        #print(dt)
        #print(dictionary)

        Net = X.loc[X['Network'] == name]
        Net['Value']= Net['Key'].map(dictionary)

        #print(Net)

        clusterdict = pd.Series(Net["Cluster"].values,index=Net["Value"]).to_dict()

        #print(clusterdict)

        edges = pd.read_csv(path.replace(".dictionary.txt",""),header= None,sep = " ")
        edges.columns =['Source','Target']

        G=nx.from_pandas_edgelist(edges, "Source", "Target",create_using=nx.DiGraph())
        
        nx.set_node_attributes(G, clusterdict, name="Cluster")

        nx.write_gexf(G, save_path+name+".gexf") 

    msg.good("Done")