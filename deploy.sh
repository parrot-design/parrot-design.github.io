
function black_green(){
    temp=''
    for str in $*
    do 
        result=$(echo "$str" | grep "\[*\]$")
        if [ "$result" != "" ]
        then
            temp="$temp\033[40;32;4m${str//\[\*\]/}\033[0m"
        else
            temp="$temp$str"
        fi
    done
    echo $temp
}

yarn build
black_green "1.文件已打包文件[*]"


git add .
black_green "2.已执行gitadd命令将文件从工作区提交到暂存区[*]" 

black_green "请输入这次需要提交的日志："
read linputlog

git commit -m "fix:${linputlog}"
black_green "3.已执行gitcommit命令将文件从暂存区提交到本地分支[*]" 

git push origin main

black_green "4.已执行gitpush命令将文件从本地分支提交到远程分支[*]" 

git subtree push --prefix docs/.vuepress/dist origin gh-pages

black_green "5.已执行gitsubtree命令将docs从本地分支提交到远程分支[*]" 
