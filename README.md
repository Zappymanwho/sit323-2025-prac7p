# sit323-2025-prac7p
In this project we have created a node.js calculator app which is in a Kuberentes Cluster and has MongoDB integration for a database with storing and displaying calculator operations history

Instructions:
git clone https://github.com/Zappymanwho/sit323-2025-prac7p.git
cd sit323-2025-prac7p

docker build -t zappymanwho/sit323-prac7p .
docker push zappymanwho/sit323-prac7p

kubectl apply -f mongodbsecretcred.yaml
kubectl apply -f mongoserv.yaml
kubectl apply -f standaloneinstance.yaml
kubectl apply -f CreateDeployment.yaml
kubectl apply -f KubernetesService.yaml

kubectl port-forward service/nodejs-service 3060:80

calculator operations:
Addition:
http://localhost:3060/add?num1=1&num2=2
Subtraction:
http://localhost:3060/subtract?num1=1&num2=2
Multiplication:
http://localhost:3060/multiply?num1=1&num2=2
Division:
http://localhost:3060/divide?num1=1&num2=2

To view the results of the calculator:
http://localhost:3060/results

MongoDB has been tested using the following commands:
mongodump --username admin --password 123 --authenticationDatabase admin --db calculator
mongorestore --username admin --password 123 --authenticationDatabase admin --db calculator /dump/calculator
