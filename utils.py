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

    colors = [{"name":"Red (Pantone)","hex":"ef233c","rgb":[239,35,60],"cmyk":[0,85,75,6],"hsb":[353,85,94],"hsl":[353,86,54],"lab":[52,73,40]},{"name":"Light sea green","hex":"2ec4b6","rgb":[46,196,182],"cmyk":[77,0,7,23],"hsb":[174,77,77],"hsl":[174,62,47],"lab":[72,-41,-4]},{"name":"Prussian blue","hex":"023047","rgb":[2,48,71],"cmyk":[97,32,0,72],"hsb":[200,97,28],"hsl":[200,95,14],"lab":[18,-5,-18]},{"name":"Bondi blue","hex":"0095b6","rgb":[0,149,182],"cmyk":[100,18,0,29],"hsb":[191,100,71],"hsl":[191,100,36],"lab":[57,-21,-26]},{"name":"Selective yellow","hex":"ffb703","rgb":[255,183,3],"cmyk":[0,28,99,0],"hsb":[43,99,100],"hsl":[43,100,51],"lab":[79,15,81]}]

    #https://coolors.co/ef233c-2ec4b6-023047-0095b6-ffb703

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


def ViewSignature(read_path,save_path):

    files = []

    for r, _, f in os.walk(read_path):
        for file in f:
            if '.edges.signatures.txt' in file:
                files.append([os.path.join(r, file),file.replace(".edges.signatures.txt","")])
    files.sort()

    msg.info("Preprocessing orbits")
    aux = pd.DataFrame()
    for file in tqdm(range(len(files))):
        path = files[file][0]
        name = files[file][1]
        df = pd.DataFrame(np.loadtxt(path),index=None)
        X = df.replace(0.0, np.nan)
        X.dropna(axis='columns',how='all',inplace=True)
        X = X.replace(np.nan,0)
        X.columns = ["Orbit "+ str(i) for i in list(X.columns)]
        # Get dtypes of each column
        print(X.dtypes)
        fig = px.imshow(X,labels=dict(x="Orbits", y="Nodes", color="Value"))
        fig.show()
        #fig.write_image("orbits.svg")

def ViewComposition(read_path,save_path):

    files = []

    for r, _, f in os.walk(read_path):
        for file in f:
            if '-NormMiniBatchUsersEmbedding' in file:
                files.append([os.path.join(r, file),file])

    for file in tqdm(range(len(files))):
        path = files[file][0]
        name = files[file][1]
        
        df = pd.read_csv(path)

        # Replace Column Names

        df.columns = ["Network","1","2","3","4","5"]

        # Order df by 1,2,3,4,5

        df = df.sort_values(by=['1','2','3','4','5'],ascending=False)

        # Plot df in Stacked Bar Chart

        fig = px.bar(df, x="Network", y=["1", "2", "3", "4", "5"], barmode="stack")

        # Set values for x and y axes

        fig.update_layout(xaxis_title="Red", yaxis_title="Composición")
        fig.update_layout(
                font=dict(
                    family="Courier New, monospace",
                    size=5,  # Set the font size here
                )
            )

        # Set legend title

        fig.update_layout(legend_title="Perfil")

        # Save plot

        fig.write_image(save_path+name+"-composicion.svg")