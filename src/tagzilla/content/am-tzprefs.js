// vim: set et ts=2 sw=2 sts=2:
/*
 * The contents of this file are subject to the Mozilla Public
 * License Version 1.1 (the "License") you may not use this file
 * except in compliance with the License. You may obtain a copy of
 * the License at http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS
 * IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * rights and limitations under the License.
 * 
 * The Original Code in this file was released on April 25, 2005
 * 
 * Unless otherwise stated, the Initial Developer of the
 * Original Code is David Perry.  Portions created by David Perry are
 * Copyright (C) 2002 David Perry.  All rights reserved.
 * 
 * Contributor(s):
 *   David Perry <d.perry@utoronto.ca> (Original Author)
 *
 * Alternatively, the contents of this file may be used under the
 * terms of the GNU General Public License Version 2 or later (the
 * "GPL"), in which case the provisions of the GPL are applicable
 * instead of those above.  If you wish to allow use of your
 * version of this file only under the terms of the GPL and not to
 * allow others to use your version of this file under the MPL,
 * indicate your decision by deleting the provisions above and
 * replace them with the notice and other provisions required by
 * the GPL.  If you do not delete the provisions above, a recipient
 * may use your version of this file under either the MPL or the
 * GPL.
 */

var gPref = null;
var gIdentity;
var gAccount;

function onPreInit(account, accountValues)
{
  gIdentity = account.defaultIdentity;
  gAccount = account;
}

function onInit() {
  /* This probably isn't the desired way to save mail preferences,
     but it is backward-compatible with TagZilla's old way of doing it */
  var els = document.getElementsByAttribute("prefstring","*");
  for( var i in els ) {
    if( !(els[i] && els[i].getAttribute) ) continue;
    var prefstring = els[i].getAttribute("prefstring").replace( /%identitykey%/, gIdentity.key );
    var preftype = els[i].getAttribute("preftype");
    var prefattr = els[i].getAttribute("prefattribute");
    var result = readMyPref( prefstring, preftype, null );
    if(prefattr == "value")
      els[i].value = result;
    else
      els[i].setAttribute(prefattr, result);
  }
}

function onSave() {
  var els = document.getElementsByAttribute("prefstring","*");
  for( var i in els ) {
    if( !(els[i] && els[i].getAttribute) ) continue;
    var prefstring = els[i].getAttribute("prefstring").replace( /%identitykey%/, gIdentity.key );
    var preftype = els[i].getAttribute("preftype");
    var prefattr = els[i].getAttribute("prefattribute");
    var result = (prefattr == "value") ? els[i].value : els[i].getAttribute(prefattr);
    writePref( preftype, prefstring, result );
  }
}
