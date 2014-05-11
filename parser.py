f = open('cylinder.vtk',"r")
r = f.readlines()
f.close()
c = 1
print "var points=["
flag = 0
for i in r:
    if 'CELLS' in i:
        flag = 0
    if flag==1:
        k = i.split()
        if len(k)==3:
            print "[%f,%f,%f],"%(float(k[0])*c,float(k[1])*c,float(k[2])*c)
    if 'POINTS' in i:
        flag = 1
print "];"

print "var cells=["
flag = 0
for i in r:
    if 'CELL_TYPES' in i:
        flag = 0
    if flag==1:
        k = i.split()
        if len(k)==5:
            print "[%s,%s,%s,%s],"%(k[1],k[2],k[3],k[4])
    if 'CELLS' in i:
        flag = 1
print "];"


flag = 0
k= []
for i in r:
    if 'CELL_DATA' in i:
        flag = 0
    if flag==1:
        try:
            if len(i)>1:
                num = float(i)
                k.append(num)
                #print "%f,"%(num)
        except:
            pass
    if 'SCALARS t' in i:
        flag = 1


max_t = max(k)
min_t = min(k)
d = max_t - min_t

print "color_t=["
for i in k:
    print "%f,"%(0.66 - (i-min_t)*0.66/d)
print "];"