#!/bin/zsh

curl -c ./cookie_c.txt -F m= -F pass= 'http://f.10086.cn/im5/login/loginHtml5.action?'
echo
echo
curl -b ./cookie_c.txt 'http://f.10086.cn/im5/index/loadGroupContactsAjax.action?'
echo
echo
curl -b ./cookie_c.txt 'http://f.10086.cn/im5/index/contactlistView.action?idContactList=0'
echo
echo
curl -b ./cookie_c.txt 'http://f.10086.cn/im5/index/contactlistView.action?idContactList=1'
echo
echo
curl -b ./cookie_c.txt 'http://f.10086.cn/im5/index/contactlistView.action?idContactList=2'
echo
echo
curl -b ./cookie_c.txt 'http://f.10086.cn/im5/index/contactlistView.action?idContactList=3'
echo
echo
curl -b ./cookie_c.txt 'http://f.10086.cn/im5/index/contactlistView.action?idContactList=4'
echo
echo
curl -b ./cookie_c.txt 'http://f.10086.cn/im5/index/contactlistView.action?idContactList=9998'
echo
echo
curl -b ./cookie_c.txt 'http://f.10086.cn/im5/index/contactlistView.action?idContactList=9999'
echo
echo

#send message
curl -b ./cookie_c.txt -F touserid=505255871 -F msg='发到飞信' 'http://f.10086.cn/im5/chat/sendNewMsg.action'
echo 
echo
curl -b ./cookie_c.txt -F touserid=525889450 -F msg='发到手机' 'http://f.10086.cn/im5/chat/sendNewShortMsg.action'
echo 
echo
#curl -b ./cookie_c.txt -F touserid=505255871 -F msg=哈哈 'http://f.10086.cn/im5/chat/sendNewShortMsg.action?'
echo 
echo
#curl -b ./cookie_c.txt -F touserid=525889450,505255871 -F msg=哈哈 'http://f.10086.cn/im5/chat/sendNewGroupShortMsg.action?'
echo 
echo

#receive message
curl -b ./cookie_c.txt 'http://f.10086.cn/im5/box/alllist.action?'
echo 
echo
#curl -b ./cookie_c.txt 'http://f.10086.cn/im5/chat/queryNewMsg.action?idMsgs=24014590'
echo 
echo
#curl -b ./cookie_c.txt http://f.10086.cn/im5/chat/queryNewMsg.action?t=1362659935223&_=1362659935223&idMsgs=24014590&t=1362659935223
echo 
echo
