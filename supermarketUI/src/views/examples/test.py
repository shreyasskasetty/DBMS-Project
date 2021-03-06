
import firebase_admin
import google.cloud
from firebase_admin import credentials
from firebase_admin import firestore
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import cv2
import sys
cred = credentials.Certificate("./supermarket-942e6-04dbfecc7446.json")
firebase_admin.initialize_app(cred)
phoneno = sys.argv[1]
doc_ref = firestore.client().collection('Co-ordinates').document(phoneno)
print("Output from Python") 
doc = doc_ref.get()
x = doc.to_dict()['x']
y = doc.to_dict()['y']
fig = plt.figure()
sns.set_style("dark", {"axes.facecolor": ".9"})
ac = sns.kdeplot(x, y, cmap="Reds",color ='b', shade=True, shade_lowest=False)
fig.add_subplot(ac)
fig.canvas.draw()
data = np.fromstring(fig.canvas.tostring_rgb(), dtype=np.uint8, sep='')
data = data.reshape(fig.canvas.get_width_height()[::-1] + (3,))
img = cv2.cvtColor(data,cv2.COLOR_BGR2GRAY)
img = cv2.resize(img,(500,440),interpolation=cv2.INTER_AREA)
loc =cv2.minMaxLoc(img)
print(loc[2][0],loc[2][1])
firestore.client().collection('Results').document(phoneno).set({u'Status' : u'True',u'x':loc[2][0],u'y': loc[2][1]})
