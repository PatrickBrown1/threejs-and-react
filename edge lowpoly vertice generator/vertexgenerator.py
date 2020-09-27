import cv2
import numpy as np


def compare_pts(a, b):
    #1 for b first -1 for a first
    if(a[2] > b[2]):
        return 1
    elif(a[2] < b[2]):
        return -1
    else:
        if(a[3] > b[3]):
            return 1
        else:
            return -1


def order_points_counterclockwise(pts):
    #pts is an array of points that look like [[x1,y1], [x2,y2], ... [xn, yn]]
    #get center point by averaging x and y values
    x_center = 217
    y_center = 109

    #Could make this better by creating multiple "centers", and using the closest one to a point

    # for point in pts:
    #     x_center += point[0]
    #     y_center += point[1]
    # x_center = x_center / len(pts)
    # y_center = y_center / len(pts)
    altered_points = []
    for point in pts:
        tempPoint = (point[0], point[1], np.arctan2(point[1] - y_center, point[0] - x_center), np.sqrt((point[1] - y_center)*(point[1] - y_center) + (point[0] - x_center)*(point[0] - x_center)))
        altered_points.append(tempPoint)
    
    altered_points = sorted(altered_points, key=lambda point: point[2])
    point_object_array = []
    for point in altered_points:
        point_object_array.append([point[0], point[1]])
    
    return np.array(point_object_array)

    



img = cv2.imread("usmap.jpg")
#convert to grayscale to support Canny processing
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#creates image of edges (edges are white, else is black)
edges = cv2.Canny(gray,100,200)

#keep anything below threshold 100, make everything else white
ret,th2 = cv2.threshold(edges,100,255,cv2.THRESH_BINARY_INV)


numCorners = 50
#detect corners from th2 image with numCorners corners, 0.1 quality threshold, and 10 min distance
corners = cv2.goodFeaturesToTrack(th2, numCorners, 0.1, 10)

c_list = []
for corner in corners:
    x,y = corner.ravel()
    c_list.append([int(x), int(y)])

corner_points = np.array(c_list)
counter_clockwise_pts = order_points_counterclockwise(corner_points)

r = 0
g = 0
b = 0
# for pt in counter_clockwise_pts:
#     cv2.circle(img,(int(pt[0]),int(pt[1])),5,(b,g,r),-1)
#     r+=5
#     g+=5
#     b+=5
print(counter_clockwise_pts)
cv2.fillPoly(img, [counter_clockwise_pts], (0,255,0))


cv2.imshow("img",img)
cv2.waitKey(0)
cv2.destroyAllWindows()

