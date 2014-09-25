
var gp_cur = 1;
var gid = 0;

var zoom_m = 384;
var zoom_w = 420;
var zoom_x = 90;
var zoom_b = 996;

var zoom_x_h = zoom_x / 2;

var mp_pos = null;

function object(objId){
	return document.getElementById(objId);
}


function getAbsPoint(e)
{
	if (e == null)
	{
		return;
	}
	var x = e.offsetLeft, y = e.offsetTop;
	while(e=e.offsetParent){x += e.offsetLeft; y += e.offsetTop;}
	x = x + 30;
	y = y + 10;
	return {"x": x, "y": y};
}

function locateZoom()
{
	var zw = object("bpd");
	if (zw == null)
	{
		return;
	}

	zw.style.left = mp_pos.x + zoom_m + 14 + "px";
	zw.style.top = mp_pos.y + 20 + "px";
}

function swap_zoom(cur)
{
	var mp = object("mp");
	var bp = object("bp");
	var vp = object("vp");

	if (mp == null || bp == null || vp == null)
	{
		return;
	}

	mp.src = "/ngp/" + gid + "/" + cur + "_m.jpg";
	bp.src = "/ngp/" + gid + "/" + cur + "_b.jpg";
	vp.src = "/ngp/" + gid + "/" + cur + "_m.jpg";

	var spd = object("spd_" + cur);
	if (spd == null)
	{
		return;
	}
	spd.style.borderColor = "#444444";
}

function change_zoom(cur)
{
	gp_cur = cur;

	var bpa = object("bpa");
	if (bpa == null)
	{
		return;
	}
	bpa.href = "/ngp/" + gid + "/" + cur + "_b.jpg";

	var spd1 = object("spd_1");
	var spd2 = object("spd_2");
	var spd3 = object("spd_3");
	var spd4 = object("spd_4");
	if (spd1 == null || spd2 == null || spd3 == null || spd4 == null)
	{
		return;
	}

	spd1.style.borderColor = "#CACACA";
	spd2.style.borderColor = "#CACACA";
	spd3.style.borderColor = "#CACACA";
	spd4.style.borderColor = "#CACACA";

	var spd = object("spd_" + cur);
	if (spd == null)
	{
		return;
	}
	spd.style.borderColor = "#058EAE";
	return;
}

function swap_back(cur)
{
	var spd = object("spd_" + cur);
	if (spd == null)
	{
		return;
	}
	spd.style.borderColor="#CACACA";

	if (cur == gp_cur)
	{
		spd.style.borderColor="#058EAE";
		return;
	}
	var mp = object("mp");
	var bp = object("bp");
	var vp = object("vp");

	if (mp == null || bp == null)
	{
		return;
	}

	mp.src = "/ngp/" + gid + "/" + gp_cur + "_m.jpg";
	bp.src = "/ngp/" + gid + "/" + gp_cur + "_b.jpg";
	vp.src = "/ngp/" + gid + "/" + gp_cur + "_m.jpg";
}

function slidebp()
{
	var x = event.clientX 
		- mp_pos.x 
		+ document.documentElement.scrollLeft;
	var y = event.clientY 
		- mp_pos.y 
		+ document.documentElement.scrollTop;

	movebigpic(x, y);
	movediv(x, y);

	var mp = object("mp");
	var bpd = object("bpd");
	var vpd = object("vpd");

	if (mp == null || bpd == null || vpd == null)
	{
		return;
	}

	mp.style.filter = "alpha(opacity=50)";

	bpd.style.display = "";
	vpd.style.display = "";
}

function closebp()
{
	var mp = object("mp");
	var bpd = object("bpd");
	var vpd = object("vpd");

	if (mp == null || bpd == null || vpd == null)
	{
		return;
	}

	mp.style.filter = "";

	bpd.style.display = "none";
	vpd.style.display = "none";
  }

function movebigpic(x, y)
{
  var bpd = object("bpd2");
  if (bpd == null)
  {
    return;
  }
  var xx = 0;
  var yy = 0;
  if (x < zoom_x_h)
  {
    xx = 0;
  }
  else if (x > (zoom_m - zoom_x_h))
  {
    xx = zoom_w - zoom_b;
  }
  else
  {
    xx = (zoom_x_h - x) * (zoom_b - zoom_w) / (zoom_m - zoom_x);
  }

  if (y < zoom_x_h)
  {
    yy = 0;
  }
  else if (y > (zoom_m - zoom_x_h))
  {
    yy = zoom_w - zoom_b;
  }
  else
  {
    yy = (zoom_x_h - y) * (zoom_b - zoom_w) / (zoom_m - zoom_x);
  }
  bpd.style.left = xx + "px";
  bpd.style.top = yy + "px";
}

function movediv(x, y)
{
  var vpd = object("vpd");
  if (vpd == null)
  {
    return;
  }

  var xx = 0;
  var yy = 0;
  if (x < zoom_x_h)
  {
    xx = 0;
  }
  else if (x > (zoom_m - zoom_x_h))
  {
    xx = zoom_m - zoom_x;
  }
  else
  {
    xx = x - zoom_x_h;
  }
  if (y < zoom_x_h)
  {
    yy = 0;
  }
  else if (y > (zoom_m - zoom_x_h))
  {
    yy = zoom_m - zoom_x;
  }
  else
  {
    yy = y - zoom_x_h;
  }

  vpd.style.left = (xx + mp_pos.x) + "px";
  vpd.style.top = (yy + mp_pos.y) + "px";
  movesmallpic(xx, yy);
}

function movesmallpic(x, y)
{
  var vp = object("vpd2");
  if (vp == null)
  {
    return;
  }

  var xx = 0 - x;
  var yy = 0 - y;

  vp.style.left = xx + "px";
  vp.style.top = yy + "px";

}
