//All functions that generate HTML should be quarantined here. 
//This is a work in progress, HTML is fairly spread out at the moment

"use strict";
//Get html for a user, given their address and name
function userHTML(address, name, ratingID) {
    //TODO sanitize this data
    return `<a href="#member?qaddress=` + ds(address) + `" onclick="showMember('` + ds(address) + `')" class="hnuser">` + ds(name) + `</a>
    <div id="rating` + ratingID + `"></div>`;
}

function postlinkHTML(txid, linktext) {
    //TODO sanitize this data
    return `<a href="#thread?post=` + ds(txid) + `" onclick="showThread('` + ds(txid) + `')">` + ds(linktext) + `</a>`;
}

function getNavButtonsHTML(start, limit, page, type, qaddress, topicName, functionName) {

    //Caution topicname may contain hostile characters/code

    var navbuttons = `<div class="navbuttons">`;

    if (start != 0) //Don't show back buttons if we're at the start
    { navbuttons += `<a class="next" href="#` + page + `?start=` + (start - 25) + `&limit=` + limit + `&type=` + type + `&qaddress=` + qaddress + `&topicname=` + encodeURIComponent(topicName) + `" onclick="javascript:` + functionName + `(` + (start - 25) + `,` + limit + `,'` + page + `','` + qaddress + `','` + type + `','` + unicodeEscape(topicName) + `')">Back | </a> `; }
    { navbuttons += `<a class="back" href="#` + page + `?start=` + (start + 25) + `&limit=` + limit + `&type=` + type + `&qaddress=` + qaddress + `&topicname=` + encodeURIComponent(topicName) + `" onclick="javascript:` + functionName + `(` + (start + 25) + `,` + limit + `,'` + page + `','` + qaddress + `','` + type + `','` + unicodeEscape(topicName) + `')">Next</div>`; }
    return navbuttons;

}

function getItemListandNavButtonsHTML(contents, navbuttons) {
    return `<table class="itemlist" cellspacing="0" cellpadding="0" border="0"><tbody>`
        + contents + "</tbody></table>"
        + `<div style="text-align:right">` + navbuttons + `</div>`;
}

function getTableClassHTML(className, contents) {
    return `<table class="` + className + `" border="0"><tbody>` + contents + `</tbody></table>`;
}

function getVoteButtons(txid, address, likedtxid, dislikedtxid) {
    var upvoteHTML;
    if (likedtxid == null) {
        upvoteHTML = `<center><a id="upvoteaction` + ds(txid) + `" href="javascript:;" onclick="likePost('` + ds(txid) + `','` + ds(address) + `')"><div id="upvote` + ds(txid) + `" class="votearrow" title="upvote"></div></a></center>`;
    } else {
        upvoteHTML = `<center><a id="upvoteaction` + ds(txid) + `" href="javascript:;"><div id="upvote` + ds(txid) + `" class="votearrowactivated" title="upvote"></div></a></center>`;
    }

    var downvoteHTML;
    if (dislikedtxid == null) {
        downvoteHTML = `<center><a id="downvoteaction` + ds(txid) + `" href="javascript:;" onclick="dislikePost('` + ds(txid) + `')"><div id="downvote` + ds(txid) + `" class="votearrow rotate180" title="downvote"></div></a></center>`;
    } else {
        downvoteHTML = `<center><a id="downvoteaction` + ds(txid) + `" href="javascript:;"><div id="downvote` + ds(txid) + `" class="votearrowactivated rotate180" title="downvote"></div></a></center>`;
    }
    return upvoteHTML + downvoteHTML;
}

function getReplyDiv(txid, page) {
    return `
        <div id="reply`+ page + ds(txid) + `" style="display:none">
            <br/>
            <textarea id="replytext`+ page + ds(txid) + `" rows="3"  style="width:100%;"></textarea>
            <br/>
            <input id="replybutton`+ page + ds(txid) + `" value="reply" type="submit" onclick="sendReply('` + ds(txid) + `','` + ds(page) + `','replystatus` + page + ds(txid) + `');"/>
            <input id="replystatus`+ page + ds(txid) + `" value="sending..." type="submit"  style="display:none" disabled/>
            <div id="replycompleted`+ page + ds(txid) + `" value=""/>
        </div>`;
}

function getReplyAndTipLinksHTML(page,txid,address){
    return `
        <font size="1">  <u><a id="replylink`+ page + ds(txid) + `" onclick="showReplyBox('` + page + ds(txid) + `');" href="javascript:;">reply</a></u></font>
        <font size="1">| <u><a id="tiplink`+ page + ds(txid) + `" onclick="showTipBox('` + page + ds(txid) + `');" href="javascript:;">tip</a></u></font>
        <span id="tipbox`+ page + ds(txid) + `" style="display:none">
            <input id="tipamount`+ page + ds(txid) + `" type="number" value="0" min="0" style="width: 6em;" step="1000"/>
            <input id="tipbutton`+ page + ds(txid) + `" value="tip" type="submit" onclick="sendTip('` + ds(txid) + `','` + ds(address) + `','` + ds(page) + `');"/>
            <input id="tipstatus`+ page + ds(txid) + `"value="sending" type="submit" style="display:none" disabled/>
        </span>`;
}

function getScoresHTML(txid, likes, dislikes, tips){
    return ` <span class="score"><span id="likescount` + ds(txid) + `">` + (ds(likes) - ds(dislikes)) + `</span> likes and <span id="tipscount` + ds(txid) + `">` + ds(tips) + `</span> sats </span>`;
}

function getAgeHTML(firstseen){
    return `<span class="age"><a>` + timeSince(ds(firstseen)) + `</a></span>`;
}

function getTopicHTML(topic){
    return ` <span class="topic">` + 
    (topic == '' ? "" : `<a href="#topic?topicname=` + encodeURIComponent(topic) + `&start=0&limit=25" onclick="showTopic(0,25,'` + unicodeEscape(topic) + `')">to topic/` + ds(topic) + `</a> | `) 
    + `</span>`;
}

function getHTMLForPostHTML(txid, address, name, likes, dislikes, tips, firstseen, message, roottxid, topic, replies, rank, page, ratingID, likedtxid, likedtipamount, dislikedtxid) {
    if (name == null) { name = address.substring(0, 10); }

    return `<tr class="athing">
                <td class="title" valign="top" align="right"><span class="rank">`+ (rank == "" ? rank : rank + `.`) + `</span></td>
                <td class="votelinks" valign="top" rowspan="2">` + getVoteButtons(txid, address, likedtxid, dislikedtxid) + `</td>
                <td class="title"><a href="#thread?root=`+ ds(roottxid) + `&post=` + ds(txid) + `" onclick="showThread('` + ds(roottxid) + `','` + ds(txid) + `')">` + anchorme(ds(message), { attributes: [{ name: "target", value: "_blank" }] }) + `</a> </td>
            </tr>
            <tr>
                <td></td>
                <td class="subtext">`
                    + getScoresHTML(txid, likes, dislikes, tips)
                    +`by ` + userHTML(address, name, ratingID) 
                    + getTopicHTML(topic)
                    + getAgeHTML(firstseen) + ` | `
                    + `<a href="#thread?root=` + ds(roottxid) + `&post=` + ds(txid) + `" onclick="showThread('` + ds(roottxid) + `','` + ds(txid) + `')">` + (Math.max(0, Number(ds(replies)))) + `&nbsp;comments</a> | `
                    + getReplyAndTipLinksHTML(page,txid,address)+`
                </td>
            </tr>
            <tr>
                <td colspan="2"></td>
                <td>`+ getReplyDiv(txid, page) + `</td>
            </tr>
            <tr class="spacer" style="height:5px"></tr>`;
}



function getHTMLForReplyHTML(txid, address, name, likes, dislikes, tips, firstseen, message, depth, page, ratingID, highlighttxid, likedtxid, likedtipamount, dislikedtxid) {
    if (name == null) { name = address.substring(0, 10); }

    return `<tr ` + (txid == highlighttxid ? `class="athing comtr highlight" id="highlightedcomment"` : `class="athing comtr"`) + `>
                <td>
                    <table border="0"><tbody><tr>
                        <td class="ind"><img src="s.gif" width="`+ depth + `" height="1"/></td>
                        <td class="votelinks" valign="top">` + getVoteButtons(txid, address, likedtxid, dislikedtxid) + `</td>
                        <td class="default">
                            <div style="margin-top:2px; margin-bottom:-10px;">
                                <span class="comhead">`
                                + userHTML(address, name, ratingID)
                                + getScoresHTML(txid, likes, dislikes, tips) 
                                + getAgeHTML(firstseen) + 
                                `</span>
                            </div>
                            <br/>
                            <div class="comment">
                                <span class="c00">`+ anchorme(ds(message).replace(/(?:\r\n|\r|\n)/g, '<br>'), { attributes: [{ name: "target", value: "_blank" }] }) + `
                                    <div class="reply">`+getReplyAndTipLinksHTML(page,txid,address)+`</div>
                                </span>
                            </div>
                            `+ getReplyDiv(txid, page) + `
                        </td>
                    </tr></tbody></table>
                </td>
            </tr>`;
}


function notificationItemHTML(iconHTML, mainbodyHTML, subtextHTML, addendumHTML) {
    //icon, mainbody and subtext should already be escaped and HTML formatted
    return `
    <tr class="spacer" style="height:15px"></tr>
    <tr class="athing">
    <td class="title" valign="top" align="right"><span class="notificationrank">`+ iconHTML + `</span></td>
    <td class="title" colspan="2">`+ mainbodyHTML + `<br/><span class="age">` + subtextHTML + `</span></td>
    </tr>
    <tr class="spacer" style="height:5px"></tr>`
        + addendumHTML +
        `<tr><td></td><td colspan="2" style="border-bottom: 1px solid #4cca47"></td></tr>`;
}

function getMapPostHTML(lat, lng) {

    return `
    <div id="newgeopost" class="bgcolor">
    <table class="table left">
        <tbody>
            <tr>
                <td><input id="lat" size="10" type="hidden" value="`+ lat + `"></td>
                <td><input id="lon" size="10" type="hidden" value="`+ lng + `"></td>
                <td><input id="geohash" size="15" type="hidden"></td>
            </tr>
            <tr>
                <td colspan="3">
                    <textarea id="newgeopostta" maxlength="217" name="text" rows="4" cols="30"></textarea>
                </td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <input id="newpostgeobutton" value="Post" type="submit" onclick="geopost();">
                    <input id="newpostgeostatus" style="display: none;" value="Sending . . ." type="submit" disabled>
                    <div id="newpostgeocompleted"></div>
                </td>
                <td></td>
                <td></td>
            </tr>
            <tr style="height:20px"></tr>
        </tbody>
    </table>
    </div>`;
}

function getRefreshButtonHTML(){
    return `<a id="refreshbutton" class="btn" href="" onclick="displayContentBasedOnURLParameters();return false;">🔄</a>`;
}

function getMembersWithRatingHTML(i,page,data){
    return `<tr>
                <td><div id="rating`+i+page+ ds(data.address) + `"</div></td>
                <td>`+getMemberLink(data.address, ds(data.name))+`</td>
                <td>`+getAddressLink(data.address, ds(data.name))+`</td>                
                </tr>`;
}


function getMemberLink(address, name) {
    return `<a href="#member?qaddress=` + ds(address) + `" onclick="showMember('` + ds(address) + `')">` + ds(name) + `</a>`;
}

function getAddressLink(address, name) {
    return `<a href="#member?qaddress=` + ds(address) + `" onclick="showMember('` + ds(address) + `')">` + ds(address) + `</a>`;
}

//Temporary function to bootstrap selection of members to rate
function getBootStrapHTML(pubkey,data,lbstcount){
    return "<tr><td>" + getMemberLink(ds(pubkey),ds(data.ratername)) + "</td>" + "<td align='center'><img height='24' width='24' src='img/rightarrow.png'/></td><td></td><td></td><td align='center'> <div id='rating" + lbstcount+ds(data.testaddress) + "'></div>  </td><td></td><td></td>" + "<td align='center'><img height='24' width='24' src='img/rightarrow.png'/></td>" + "<td>" + getMemberLink(ds(data.testaddress),ds(data.name)) + "</td><td>"+`<a href='#trustgraph?member=` + ds(pubkey) + `&amp;target=` + ds(data.testaddress) + `' onclick='showTrustGraph("` + ds(pubkey) + `","` + ds(data.testaddress) + `");'>Full Trust Graph</a>`+"</td></tr>";
}