
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
doc_ref = firestore.client().collection('Co-ordinates')
print("Output from Python") 
try:
    docs = doc_ref.stream()
    for doc in docs:
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
        cv2.imshow("heat map",data)
        cv2.imshow("heat Map",img)
        print(cv2.minMaxLoc(img))
        cv2.waitKey(0) # waits until a key is pressed
        cv2.destroyAllWindows()
except google.cloud.exceptions.NotFound:
    print(u'Missing data')
