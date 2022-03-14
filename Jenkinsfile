#!groovy
pipeline{
    agent any
    //定义仓库地址
    environment {
            REPOSITORY = "git@github.com:NJUcdx/oasisplus-frontend.git"
    }


    stages {

        stage('拉取代码'){
            steps {
                echo "从 git:${REPOSITORY} 拉取代码"
                //清空当前目录
                deleteDir()
                //拉取代码
                git "${REPOSITORY}"
            }
        }


        stage('远程服务器部署'){
            steps {
                script{
                    echo "查看当前目录"
                    sh 'scp -r ../oasisplus-fronted root@172.19.241.226:/root/'
                    echo "连接后端服务器"
                    sh "ssh -tt root@172.19.241.226 'cd /root/oasisplus-fronted;sh build.sh'"
                }

            }
        }

    }
}
