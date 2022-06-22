import numpy as np
import sys
import pandas as pd
# def recommend(nameProduct):
df1 = pd.read_pickle(r'C:\Users\TienNguyen\Documents\DOAN\controller\rating_file.pkl')
correlation_matrix = np.load(r"C:\Users\TienNguyen\Documents\DOAN\controller\maximums.npy")
i = str(sys.argv[1])
namePro = list(df1.index)
product_id = namePro.index(i)

correlation_product_id = correlation_matrix[product_id]
Recommend_pro = list(df1.index[correlation_product_id > 0.65])

Recommend_pro.remove(i) 

print(Recommend_pro[0:10])
