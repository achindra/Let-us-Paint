<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Paint.aspx.cs" Inherits="Paint" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Let's Paint</title>
    <script lang="JavaScript" type="text/javascript" src="/Scripts/PaintScript.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <table border="1">
            <tr>
                <td colspan="3"><h3>Let's Paint</h3></td>
            </tr>
            <tr>
                <td rowspan="2"><canvas id="myCanvas" height="500" width="800" style="border:1px solid #FF00FF; position:relative">HTML5 Compatible browser required</canvas>
                  <!--<img id="canvasImg" alt="Right click to save me!">-->
                </td>
                <td>
                    <h5>Drawing Tool</h5>
                    <input id="IsPen"       type="radio" name="DrawingTool" onclick="Radio_Tool('Pen')"         value="Pen" checked="checked" />Pen<br />
                    <input id="IsLine"      type="radio" name="DrawingTool" onclick="Radio_Tool('Line')"        value="Line" />Line<br />
                    <input id="IsRectangle" type="radio" name="DrawingTool" onclick="Radio_Tool('Rectangle')"   value="Rectangle" />Rectangle<br />
                    <input id="IsCircle"    type="radio" name="DrawingTool" onclick="Radio_Tool('Circle')"      value="Circle" />Circle<br />
                    <input id="IsEraser"      type="radio" name="DrawingTool" onclick="Radio_Tool('Eraser')"    value="Eraser" />Eraser<br />
                </td>
                <td>
                    <h5>Brush Size</h5>
                    <input id="Brush_Size_1" type="radio" name="BrushSize" value="1" onclick="Radio_Brush(1)" checked="checked" /> 1<br />
                    <input id="Brush_Size_2" type="radio" name="BrushSize" value="2" onclick="Radio_Brush(2)" /> 2<br />
                    <input id="Brush_Size_3" type="radio" name="BrushSize" value="3" onclick="Radio_Brush(3)" /> 3<br />
                    <input id="Brush_Size_4" type="radio" name="BrushSize" value="4" onclick="Radio_Brush(4)" /> 4<br />
                    <input id="Brush_Size_5" type="radio" name="BrushSize" value="5" onclick="Radio_Brush(5)" /> 5<br />
                </td>
                <tr>
                    <td colspan="2">
                    <h5>Pen Color</h5>
                    <canvas id="ColorPicker" height="256" width="400" style="border:1px solid #000000"></canvas>
                    </td>
                </tr>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
