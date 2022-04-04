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

from itertools import count

##############################################################################################################################

def AuditCentroids(centroids_path):

    X = np.loadtxt(centroids_path,delimiter=",")
    for c in X:
        aux = sorted(enumerate(c),reverse=True, key=lambda x:x[1])
        print(aux)

def ColorNetworks(read_path,users_path,save_path):

    colors = [{"name":"Y In Mn Blue","hex":"355070","rgb":[53,80,112],"cmyk":[53,29,0,56],"hsb":[213,53,44],"hsl":[213,36,32],"lab":[33,0,-22]},{"name":"Chinese Violet","hex":"6d597a","rgb":[109,89,122],"cmyk":[11,27,0,52],"hsb":[276,27,48],"hsl":[276,16,41],"lab":[41,15,-16]},{"name":"Cinnamon Satin","hex":"b56576","rgb":[181,101,118],"cmyk":[0,44,35,29],"hsb":[347,44,71],"hsl":[347,35,55],"lab":[52,34,5]},{"name":"Candy Pink","hex":"e56b6f","rgb":[229,107,111],"cmyk":[0,53,52,10],"hsb":[358,53,90],"hsl":[358,70,66],"lab":[60,48,21]},{"name":"Tumbleweed","hex":"eaac8b","rgb":[234,172,139],"cmyk":[0,26,41,8],"hsb":[21,41,92],"hsl":[21,69,73],"lab":[75,19,26]}]

    #https://coolors.co/355070-6d597a-b56576-e56b6f-eaac8b

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
        dt.columns =['Index','NodeID']
        dictionary = pd.Series(dt["NodeID"].values,index=dt["Index"]).to_dict()

        #print(dt)
        #print(dictionary)

        Net = X.loc[X['Network'] == name]
        #print(Net)
        Net['Value']= Net['Key'].map(dictionary)
        #print(Net)

        clusterdict = pd.Series(Net["Cluster"].values+1,index=Net["Value"]).to_dict()

        #print(clusterdict)

        edges = pd.read_csv(path.replace(".dictionary.txt",""),header= None,sep = " ")
        edges.columns =['Source','Target']

        G=nx.from_pandas_edgelist(edges, "Source", "Target",create_using=nx.DiGraph())
        
        nx.set_node_attributes(G, clusterdict, name="Cluster")

        colordict = {}

        for n in G.nodes():
            c = G.nodes[n]['Cluster'] 
            color = colors[c-1]['rgb']
            colordict[n] = {"color":{'r': color[0], 'g': color[1], 'b': color[2], 'a': 1}}
            #G.nodes[n]['viz']['color'] = {'r': color[0], 'g': color[1], 'b': color[2]}

        nx.set_node_attributes(G, colordict, name="viz")

        #pos = nx.spring_layout(G)
        #ec = nx.draw_networkx_edges(G, pos, alpha=0.2)
        #nc = nx.draw_networkx_nodes(G, pos, nodelist=nodes, node_color=colors, cmap=plt.cm.jet)
        #plt.colorbar(nc)
        #plt.axis('off')
        #plt.show()

        nx.write_gexf(G, save_path+name+".gexf") 

    msg.good("Done")

def GraphletCorrelations(read_path,save_path):

    files = []

    for r, _, f in os.walk(read_path):
        for file in f:
            if '.edges.graphletcounts.txt' in file:
                files.append([os.path.join(r, file),file.replace(".edges.graphletcounts.txt","")])
    files.sort()

    complete = pd.DataFrame()
    for file in tqdm(range(len(files))):
        path = files[file][0]
        name = files[file][1]
        df = pd.read_csv(path,sep=" ",names=["Graphlet",name])
        df = pd.pivot_table(df,columns="Graphlet")
        #print(df)
        complete = pd.concat([complete, df])
        #os.system("clear")
        #msg.info(rungdgv)

    for column in complete.columns:
        complete[column] = skp.MinMaxScaler().fit_transform(complete[column].values.reshape(-1, 1))

    corr_matrix = complete.corr()
    
    sns.set(font_scale=0.1)
    sns.heatmap(corr_matrix, annot=True)
    plt.savefig(save_path+"Graphlet-Corr.svg")