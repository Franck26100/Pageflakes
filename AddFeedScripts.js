var PAPER_ICON="paperIcon.png";var MANAGE_BOOKMARK_POPUP_ID="ManageBookmarkPopup";function AddContent_Scripts_addFeed(B,A){App.createNewModule(B,RSS_FEED_FLAKE_URL+escape(A),function(){PageflakesUtility.setIdle()},0,parseInt(App.currentPage.columnCount/2))}function AddContent_Scripts_addContentInPage(E,A,D){$nodisplay(A);$display(D);var C=$(E);var B=$(D);B.innerHTML="Discovering...";B.style.display="block";App.Server.Discover(C.value,function(F){AddContent_Scripts_showResults(D,F)})}function AddContent_Scripts_showResults(N,I){var P=document.createElement("div");var R=false;var D=false;for(var M=0;M<I.length;M++){var Q=I[M];var U=Q.Title;var E=Q.Url;var C=Q.TypeOfContent;if(C==-1){var K=document.createElement("div");T(K,U);P.appendChild(K);R=true}else{if(C==0){}else{D=true;var K=document.createElement("div");K.className="AddContentResultItem";var G=document.createElement("a");G.className="AddFeedPopup_FeedItem";formattedTitle=U.replace(/'/g,"\\'");formattedUrl=E.replace(/'/g,"\\'");G.href="javascript:AddContent_Scripts_addContent('"+escape(formattedTitle)+"', '"+escape(formattedUrl)+"', "+C+");";T(G,unescape(U));K.appendChild(G);K.appendChild(document.createElement("br"));var A=document.createElement("small");T(A,AddContent_getTypeDescription(C));K.appendChild(A);P.appendChild(K);var H=document.createElement("div");H.id="AddContentResultOption";H.width="100%";if(C==1||C==2){var F=document.createElement("img");F.src=IMAGE_PREFIX+"images/addToBookmark.png";F.align="middle";F.style.width=19;F.style.Height=18;H.appendChild(F);var S=document.createElement("a");S.href="javascript:AddContent_addBookmark('"+escape(formattedTitle)+"', '"+escape(formattedUrl)+"');";T(S,Lang.ADD_FEED_BOOKMARK_LATER);H.appendChild(S);var L=document.createElement("span");PageflakesUtility.setInnerText(L," ");L.width=10;H.appendChild(L)}var O=document.createElement("img");O.style.width=23;O.style.Height=18;O.src=IMAGE_PREFIX+"images/addToPage.png";O.align="middle";H.appendChild(O);var B=document.createElement("a");B.href="javascript:AddContent_Scripts_addContent('"+escape(formattedTitle)+"', '"+escape(formattedUrl)+"', "+C+");";T(B,Lang.ADD_FEED_ADD_TO_MY_PAGE);H.appendChild(B);P.appendChild(H)}}}var J=$(N);if(!R){if(D){J.innerHTML='<table cellspacing="0" cellpadding="0" width="95%"><tr><td>&nbsp;<b>'+Lang.ADD_FEED_AVAILABLE_CONTENT+':</b></td><td valign="center" align="right"><img src="'+IMAGE_PREFIX+'images/closeFeedResult.PNG" onclick="$nodisplay(\''+N+'\');" style="cursor: pointer; cursor: hand;"/></td></tr></table>'}else{J.innerHTML='<b>Site does not seem to contain any feed.</b> <a href="#" onclick="window.open(\'help.html\')">Help</a>'}}else{J.innerHTML="<b>Error</b><br/>"}J.appendChild(P)}function AddContent_Scripts_addContent(C,A,B){C=unescape(C);A=unescape(A);if(B==0){AddContent_Scripts_addFlake(C,A)}else{if(B==1){AddContent_Scripts_addFeed(C,A)}else{if(B==2){AddContent_Scripts_addFeed(C,A)}else{if(B==3){AddContent_Scripts_addFlake(C,A)}}}}}function AddContent_getTypeDescription(B){var A=new Array("Web Page",Lang.ADD_FEED_RSS_FEED,Lang.ADD_FEED_ATOM_FEED,"Pageflake");return A[B]}function AddContent_toggleTreeNode(A){AddContent_toggleTreeImage(A)}function AddContent_toggleTreeImage(B){var A="div_"+B;var C="img_"+B;$toggle(C,A)}function AddContent_collapseFeedTreeNodes(){try{var F=$("FeedRoots");var B=F.getElementsByTagName("ul");for(var D=0;D<B.length;D++){if(B.item(D).style.display!="none"){var E=B.item(D).id.substring(B.item(D).id.indexOf("_")+1);$("div_"+E).style.display="none";var A=$("img_"+E);if(A!=null){A.src=IMAGE_PREFIX+"images/LeftArrow.png"}}}}catch(C){alert(C.message)}}function AddContent_toggle(B,A){$toggle(B,A)}function AddContent_addRssToPage(A,B){AddContent_Scripts_addContent("",A,1)}function AddContent_addBookmark(B,A){App.Server.AddBookmark(B,A,function(C){AddContent_refreshBookmarkList(C);RssCache.addChannelInCache(A)})}function AddContent_deleteAllBookmark(){App.Server.DeleteAllBookmark(function(A){AddContent_refreshBookmarkList(A);RssCache.refreshCachedRssChannelList()})}function AddContent_deleteBookmark(C,B){var A=$("bookmark_"+C);A.innerHTML="removing...";App.Server.DeleteBookmark(C,function(D){AddContent_refreshBookmarkList(D)});RssCache.removeChannelFromCache(B)}function AddContent_loadBookmarks(){App.Server.GetAllBookmarksHtml(function(A){AddContent_refreshBookmarkList(A)})}function AddContent_refreshBookmarkList(A){var B=new Image();B.src=App.currentTemplate.path+PAPER_ICON;var C=$("Bookmarks");if(null==C){return}C.innerHTML=A;if(A.length==0){$("Bookmarks").innerHTML=Lang.NO_BOOKMARKS}}function AddContent_ToggleOPMLoptions(){var A=$("OPMLoptionsDiv");if(A.style.display=="none"){A.style.display="block"}else{A.style.display="none"}}function AddContent_showOPMLmessage(B){var A=$("OPMLmessageDiv");A.innerHTML=B;A.style.display="block";RssCache.refreshCachedRssChannelList()}function AddContent_ManageBookmarks(){var E=$(MANAGE_BOOKMARK_POPUP_ID);if(E==null){var A=App.createPopup(MANAGE_BOOKMARK_POPUP_ID,"<b>"+Lang.BOOKMARKED_FEEDS+"</b>",450,"auto");E=$(MANAGE_BOOKMARK_POPUP_ID);E.style.left="430px";var D=PageflakesUtility.getPosition($("OpmlLink"));E.style.top=D[1]+"px";var C=$("closeLink"+MANAGE_BOOKMARK_POPUP_ID);C.onclick=function(F){$nodisplay(E);App.showAllControls()};var B="BookmarkPopup.aspx";App.Server.GetPage(MANAGE_BOOKMARK_POPUP_ID,SITE_PREFIX+B,function(F){if(!Pageflakes.loadPage(F,A)){$showError(Lang.COMMON_ERROR_ALERT);return}else{if(typeof AddContent_loadBookmarks=="function"){AddContent_loadBookmarks()}}});App.hideAllControls()}else{AddContent_loadBookmarks();$display(E)}}window.setTimeout(AddContent_loadBookmarks,100);