
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


git add .
black_green "1.已执行gitadd将文件从工作区提交到暂存区[*]"

black_green "请输入这次需要提交的日志："
read linputlog

git commit -m "fix:${linputlog}"