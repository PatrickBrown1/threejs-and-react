
#cv2.imwrite('messigray.png',foreground/255)
import cv2
import numpy


# Read the images
foreground = cv2.imread("textures/earthcloudmap.jpg")
background = cv2.imread("textures/clean.png")
alpha = cv2.imread("textures/earthcloudmaptrans.jpg")

# Convert uint8 to float
foreground = foreground.astype(float)
background = background.astype(float)

# Normalize the alpha mask to keep intensity between 0 and 1
alpha = alpha.astype(float)/255

# Multiply the foreground with the alpha matte
foreground = cv2.multiply(alpha, foreground)

# Multiply the background with ( 1 - alpha )
for i in range(len(foreground)):
    for j in range(len(foreground[i])):
        numpy.append(foreground[i][j], alpha[i][j][0])
        foreground[i][j][0] = foreground[i][j][0] * (alpha[i][j][0])
        foreground[i][j][1] = foreground[i][j][1] * (alpha[i][j][0])
        foreground[i][j][2] = foreground[i][j][2] * (alpha[i][j][0])
            

# Add the masked foreground and background.
outImage = cv2.add(foreground, background)

# Display image
cv2.imshow("outImg", outImage)
cv2.waitKey(0)
