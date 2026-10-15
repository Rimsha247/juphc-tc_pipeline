# Tax Calculator (Final Project)

Node.js + Express app. Enter an annual income, get tax, net income and effective rate.
The tax slabs are SAMPLE values in `src/taxCalculator.js`. Change them if your course gives different rules.

## Structure
- `server.js` – web server and API (`/api/tax?income=...`, `/health`)
- `src/taxCalculator.js` – tax logic
- `public/index.html` – web page
- `spec/` – Jasmine tests
- `Dockerfile` – container image
- `tekton/` – CI/CD pipeline files

---
## Step 1 – Run Jasmine unit tests (1 pt)
    npm install
    npm test
Screenshot the "10 specs, 0 failures" output.

## Step 2 & 3 – Dockerfile and build image (2 pts)
The Dockerfile is already included.
    docker build -t tax-calculator:1.0 .
    docker images | grep tax-calculator

## Step 4 – Run and test in local Docker (1 pt)
    docker run -d -p 3000:3000 --name tax tax-calculator:1.0
    curl "http://localhost:3000/api/tax?income=2200000"
Open http://localhost:3000 in the browser and take a screenshot.
    docker stop tax && docker rm tax

## Step 5 – Tag and push to IBM Cloud Container Registry (1 pt)
    ibmcloud login            # add --sso if needed
    ibmcloud cr region-set us-south
    ibmcloud cr namespace-add <your-namespace>
    ibmcloud cr login
    docker tag tax-calculator:1.0 us.icr.io/<your-namespace>/tax-calculator:1.0
    docker push us.icr.io/<your-namespace>/tax-calculator:1.0
    ibmcloud cr images

## Step 6 – Deploy on IBM Cloud (1 pt)
Use the method your lab tells you (Code Engine or Kubernetes/OpenShift). Code Engine example:
    ibmcloud ce project create --name tax-project
    ibmcloud ce application create --name tax-calculator \
      --image us.icr.io/<your-namespace>/tax-calculator:1.0 \
      --registry-secret <your-registry-secret> --port 3000
    ibmcloud ce application get --name tax-calculator   # shows the public URL
OpenShift/Kubernetes example:
    kubectl create deployment tax-calculator --image=us.icr.io/<your-namespace>/tax-calculator:1.0
    kubectl expose deployment tax-calculator --port=3000 --type=NodePort

## Steps 7–10 – Tekton pipeline (4 pts)
    kubectl apply -f tekton/pvc.yaml
    kubectl apply -f tekton/tasks.yaml          # Step 7: tasks
    kubectl apply -f tekton/pipeline.yaml       # Step 8: pipeline calls the tasks
    # edit tekton/pipelinerun.yaml first (repo URL + image name)
    kubectl create -f tekton/pipelinerun.yaml   # Step 9: run it
    tkn pipelinerun logs --last -f
    tkn pipelinerun list
Step 10: deploy the image the pipeline built, and screenshot the running app:
    kubectl create deployment tax-calculator-pipeline --image=us.icr.io/<your-namespace>/tax-calculator:latest

## Push to GitHub
    git init && git add . && git commit -m "Tax Calculator final project"
    git branch -M main
    git remote add origin https://github.com/<you>/tax-calculator.git
    git push -u origin main
