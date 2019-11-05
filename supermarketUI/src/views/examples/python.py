import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import cv2

x = np.random.rayleigh(scale=25,  size=5000)
y = np.random.rayleigh(scale = 25,size=5000)

fig = plt.figure()
plt.axis('off')
sns.set_style("dark", {"axes.facecolor": ".9"})
ac = sns.kdeplot(x, y, cmap="Reds",color ='b', shade=True, shade_lowest=False)
fig.add_subplot(ac)
fig.canvas.draw()
data = np.fromstring(fig.canvas.tostring_rgb(), dtype=np.uint8, sep='')
data = data.reshape(fig.canvas.get_width_height()[::-1] + (3,))
img = cv2.cvtColor(data,cv2.COLOR_BGR2GRAY)
cv2.imshow("heat map",data)
cv2.imshow("heat Map",img)
print(cv2.minMaxLoc(img))
cv2.waitKey(0) # waits until a key is pressed
cv2.destroyAllWindows() # destroys the window showing image
