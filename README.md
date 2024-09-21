http://ec2-3-82-60-212.compute-1.amazonaws.com/

1. created mysql db on AWS RDS and added several tables associated by primary and foreign keys
   : dbScripts.sql
2. created an env file in an S3 bucket and created a Role to give the Ec2 instance access to use the environment vars and attched other roles to EC2
3. created a Node.js script to get data from an API and insert this into the db to get a lot of data to use for the graphql server
4. created a Ndoe.js API to insert data into mysql
5. created a Docker image and pushed it to ECR AWS to pull in the EC2 instance and run
6. set up nginx to proxy_pass the request from the public EC2 IP to the localhost apollo graphql server
7. made several resolvers and graphql types and methods along with a JavaScript class to handle returning data to the resolvers
8. created graphql queries to test the data responses

DB_HOST=stocks.c7m2aik223yl.us-east-2.rds.amazonaws.com

Test Query for the POC

fragment NameParts on Detail {
name
}

query Query {
details {
...NameParts
market
active
locale
primary_exchange
address {
city
state
}
stuff {
item
}
}
}

aws s3 cp s3://mysql-env/s3-env s3-env
sudo docker run --env-file s3-env -d -it -p 4000:4000 public.ecr.aws/c7w4y0f1/cra/graph:latest
-----nginx--------
server {
listen 80;
listen [::]:80;

    server_name _;

    location / {
    	proxy_pass http://localhost:4000;

    }

}
