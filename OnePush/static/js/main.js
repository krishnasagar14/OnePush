/**
 * Created by krishnasagar on 18/9/16.
 */

function f1() {
    if(window.localStorage.getItem('results')) {f3();}
    else {
            $.ajax({
            url : "https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites",
            type : "GET",
            cache: true,
            success : function(result) {
                var res = result['websites'];
                var total = res.length;
                window.localStorage.setItem('results',JSON.stringify(res));
                f5(res, total);
                autoComF6(res);
            },
        });
    }
    //setTimeout(f2, 1500);
}

function f2() {
    $("#loader").css("display", "none");
    $("#listCon").css("display", "inline-block");
}

function f3() {
    var res = JSON.parse(window.localStorage.getItem('results'));
    var total = res.length;
    f5(res, total);
    //setTimeout(f2, 1500);
    autoComF6(res);
}

function f4(ele) {
    setTimeout (function() {
        ele.attr('disabled','');
        window.localStorage.delete('button');
    }, 1000 * 60);
}

function f5(res, total) {
    var numFound = 0;
    $("#nextBttns").hide().empty();
    $("#listCon > ul").hide().empty();
    for(var i = 0;i<total;i++) {
        if(res[i]['tag'].toLowerCase() == "personal") {
            numFound += 1;
        }

        var li;
        if(i<4) {
            li = $("<li>", {id:'portfolio', class: i.toString()});
        }
        else {
            li = $("<li>", {id:'portfolio', class: i.toString()}).hide();
        }
        var img=$("<img>", {id:"avatarid"});
        if(res[i]['favicon_image']) {
            img.attr('src', res[i]['favicon_image']);
        }
        else {
            img.attr('src', '');
        }
        li.append(img);
        var dt = $("<dt>", {id:"name"});
        if(res[i]['title']) {
            dt.text(res[i]['title']);
        }
        else {
            dt.text("");
        }
        li.append(dt);
        var dd = $("<dd>", {id:"details"});
        dd.append($("<img>", {id:"tagId", src: tag}));
        if(res[i]['tag']) {
            dd.append(res[i]['tag'] + " | ");
        }
        else {dd.append(" | ");}
        dd.append($("<img>", {id:"linkId", src: link}));
        var a = $("<a>", {target:"_blank"});
        if(res[i]['url_address']) {
            a.attr('href', res[i]['url_address']).text(res[i]['url_address']);
        }
        else {a.attr('href', ' ').text('No address');}
        dd.append(a);
        dd.append($("<img>", {id:"likeid", title: i.toString(), src:like}).click(function() {
            var divlikes = $(this).parent().find("#divlikes");
            if(window.localStorage.getItem(i.toString())) {
                divlikes.text(parseInt(window.localStorage.getItem(i.toString())) + 1);
                window.localStorage.setItem($(this).attr('title'), parseInt(divlikes.text()));
            }
            else {
                divlikes.text(parseInt(divlikes.text())+1);
                window.localStorage.setItem($(this).attr('title'), parseInt(divlikes.text()));
            }
        }));
        dd.append($("<span>", {id:"divlikes", class:"badge"}).text(function(){
            if(window.localStorage.getItem(i.toString())) {
                return window.localStorage.getItem(i.toString());
            }
            else {
                return "0";
            }
        }));
        li.append(dd);
        $("#listCon > ul").append(li);
    }
    $("#info2").append("We'hv found <kbd>" + numFound +"</kbd> personal web portfolio");

    $("#listCon > ul").show("slow");
    for(var j = 3;j<total;j++) {
        $("#nextBttns").append($("<button>",{type:"button",class:"btn btn-primary"}).text(j+1).click(function(){
            //f3($(this), tag, link, like, total);
            var t = parseInt($(this).text());
            $("." + (t-4).toString()).replaceWith($("." + (t-3).toString()));
            $("." + t).show();
        }));
    }
    $("#nextBttns").show("slow");
    setTimeout(f2, 800);
}

$("#bttnPush").click(function() {
    if(window.localStorage.getItem('button')) {
        $("#container2").append($("<div>", {class:"alert alert-info"})
            .append("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Info!</strong> Addition in website is allowed after 1 hour."));
    }
    else {
        var title = $("#titleIn").val(), url = $("#urlIn").val(), tag = $("#tagIn").val();
        var name_regex = /^[a-zA-Z]+$/, url_regex = /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        if(!title.match(name_regex) || title.length == 0) {
            $("#titleIn").val("");
            $("#container2").append($("<div>", {class:"alert alert-danger"})
                .append("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Danger!</strong> Enter title value properly."));
        }
        else if(url.length==0 || !url_regex.test(url)) {
            $("#urlIn").val("");
            $("#container2").append($("<div>", {class:"alert alert-danger"})
                .append("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Danger!</strong> Enter url in standard fashion."));
        }
        else if(!tag.match(name_regex) || tag.length == 0) {
            $("#tagIn").val("");
            $("#container2").append($("<div>", {class:"alert alert-danger"})
                .append("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Danger!</strong> Enter tag field properly."));
        }
        else {
            $.ajax({
                url : 'https://hackerearth.0x10.info/api/one-push?type=json&query=push',
                type : "POST",
                data : {'title':title,'url':url, 'tag':tag},
                success: function () {
                    $("#titleIn").val("");
                    $("#urlIn").val("");
                    $("#tagIn").val("");
                }
            });
            $(this).attr('disabled', 'disabled');
            f4($(this));
            $("#container2").append($("<div>", {class:"alert alert-info"})
                .append("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Info!</strong> Success .... Addition in website is allowed after 1 hour."));
            window.localStorage.setItem('button', 'yes');
        }
    }
});

$('#searchBttn').click(function(e) {
    //if (e.keyCode == 13) {
    var txt = $("#searchbox").val().toLowerCase();
    if(txt.length>0) {
        //var li = $("#portfolio:contains(' "+ txt +" ')").find('*');
        //if(!window.localStorage.getItem('results')) {
        var liArr = [];
        var DL = $("<dl>", {id:"listCon1"}),
            dl = $("<ul>").css("list-style-type","None");
        $.each(JSON.parse(window.localStorage.getItem('results')), function(i,obj) {
            var t=false,u=false,tg=false;
            if(obj['title'].toLowerCase().includes(txt)) { t=true;}
            if(obj['url_address'].toLowerCase().includes(txt)) {u=true;}
            if(obj['tag'].toLowerCase().includes(txt)) {tg=true;}
            if(t == true || u == true || tg == true) {
                var li = $("<li>", {id:"portfolio"});
                var dd = $("<dd>", {id:"details"});
                dd.append($("<img>", {id:"tagId", src:tag}));
                dd.append(" " + obj['tag'] + " | ");
                dd.append($("<img>", {id:"linkId", src:link}));
                dd.append($("<a>", {href:obj['url_address'],target:"_blank"}).text(obj['url_address']));
                //dd.append($("<img>", {src:like}));
                //dd.append($("<span>", {class:"badge", id:"divlikes"}).text("0"));
                dd.append($("<img>", {id:"likeid", title: i.toString(), src:like}).click(function() {
                    var divlikes = $(this).parent().find("#divlikes");
                    if(window.localStorage.getItem(i.toString())) {
                        divlikes.text(parseInt(window.localStorage.getItem(i.toString())) + 1);
                        window.localStorage.setItem($(this).attr('title'), parseInt(divlikes.text()));
                    }
                    else {
                        divlikes.text(parseInt(divlikes.text())+1);
                        window.localStorage.setItem($(this).attr('title'), parseInt(divlikes.text()));
                    }
                }));
                dd.append($("<span>", {id:"divlikes", class:"badge"}).text(function(){
                    if(window.localStorage.getItem(i.toString())) {
                        return window.localStorage.getItem(i.toString());
                    }
                    else {
                        return "0";
                    }
                }));
                li.append($("<img>", {id:"avatarid", src:obj['favicon_image']}));
                li.append($("<dt>", {id:"name"}).text(obj['title']));
                li.append(dd);
                dl.append(li);
            }
        });
        DL.append(dl);
        console.log(dl.children().length);
        if(dl.children().length>0) {
            $("#searchBody").empty().append(DL.css('display', '"inline-block"'));
        }
        else {
            $("#searchBody").empty().append("<h2> No results found on key - " + txt);
        }
    }
    else {
        $("#searchBody").empty().append("<h2> No results found on key - None");
    }
});

function autoComF6(res) {
    var sourceArr = [];
    $.each(res, function(i,obj) {
        //obj['title'], obj['tag'], obj['url_address']
        sourceArr.push({label : obj['title'], category : 'Name'});
        sourceArr.push({label : obj['tag'], category : 'Tag'});
        sourceArr.push({label : obj['url_address'], category : 'URL'});
        /*if(sourceArr.indexOf(obj['title']) == -1) {
            sourceArr.push(obj['title']);
        }
        if(sourceArr.indexOf(obj['tag']) == -1) {
            sourceArr.push(obj['tag']);
        }
        if(sourceArr.indexOf(obj['url_address']) == -1) {
            sourceArr.push(obj['url_address']);
        }*/
    });
    $("#searchbox").autocomplete({
        source : sourceArr,
        dealy : 0//autoFocus : true
    });
}