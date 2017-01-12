<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>
    <title>ANVGL Portal - Login</title>
    
    <link rel="stylesheet" type="text/css" href="css/vl-styles.css">
    
    
    <style type="text/css">
      #sitenav-03 a {
        background: url( "img/navigation.gif" ) -200px -38px no-repeat;
      }
    </style>

    <%-- Code Mirror inclusions --%>
    
    <link href="CodeMirror-5.16/lib/codemirror.css" type="text/css" rel="stylesheet" />    
    <script type="text/javascript" src="CodeMirror-5.16/lib/codemirror.js"></script>
    <script type="text/javascript" src="CodeMirror-5.16/mode/python/python.js"></script>
    <script type="text/javascript" src="CodeMirror-5.16/mode/javascript/javascript.js"></script>
    

    <!-- Portal Core Includes -->
    <%-- 
    <jsp:include page="../../portal-core/jsimports.jsp"/>
    <jsp:include page="../../portal-core/cssimports.jsp"/>
    <jsp:include page="../../cssimports.htm"/>
    --%>
    <jsp:include page="../../portal-core/cssimports.jsp"/>
    <jsp:include page="../../cssimports.htm"/>
    

</head>

<body>
    <%@ include file="page_header.jsp" %>
    <div id="body">
	    <div class="login-message">
	    <p>Please log in to the system by choosing one of the login options below.</p>
	    
	    <div class="google-medium-icon" onclick="location.href='google/google_login.html';"></div><br>
	    <div class="aaf-medium-icon" onclick="location.href='aaf/aaf_login.html';"></div>
	    
	    </div>
	</div>
    <%@ include file="page_footer.jsp" %>
</body>

</html>