import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import cv2
from IPython.display import Image

x = np.random.rayleigh(scale=25,  size=5000)
y = np.random.rayleigh(scale = 25,size=5000)

fig = plt.figure()
plt.axis('off')
sns.set_style("dark", {"axes.facecolor": ".9"})
ac = sns.kdeplot(x, y, cmap="Blues",color ='b', shade=True, shade_lowest=False)
fig.add_subplot(ac)

# If we haven't already shown or saved the plot, then we need to
# draw the figure first...
# Now we can save it to a numpy array.

data = np.fromstring(fig.canvas.tostring_rgb(), dtype=np.uint8, sep='')
data = data.reshape(fig.canvas.get_width_height()[::-1] + (3,))
img = cv2.cvtColor(data,cv2.COLOR_BGR2GRAY)
cv2.show(img)
cv2.minMaxLoc(img)