<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE eagle SYSTEM "eagle.dtd">
<eagle version="9.7.0">
<drawing>
<settings>
<setting alwaysvectorfont="no"/>
<setting verticaltext="up"/>
</settings>
<grid distance="0.1" unitdist="inch" unit="inch" style="lines" multiple="1" display="no" altdistance="0.01" altunitdist="inch" altunit="inch"/>
<layers>
<layer number="1" name="Top" color="4" fill="1" visible="no" active="no"/>
<layer number="2" name="Route2" color="16" fill="1" visible="no" active="no"/>
<layer number="3" name="Route3" color="17" fill="1" visible="no" active="no"/>
<layer number="4" name="Route4" color="18" fill="1" visible="no" active="no"/>
<layer number="5" name="Route5" color="19" fill="1" visible="no" active="no"/>
<layer number="6" name="Route6" color="25" fill="1" visible="no" active="no"/>
<layer number="7" name="Route7" color="26" fill="1" visible="no" active="no"/>
<layer number="8" name="Route8" color="27" fill="1" visible="no" active="no"/>
<layer number="9" name="Route9" color="28" fill="1" visible="no" active="no"/>
<layer number="10" name="Route10" color="29" fill="1" visible="no" active="no"/>
<layer number="11" name="Route11" color="30" fill="1" visible="no" active="no"/>
<layer number="12" name="Route12" color="20" fill="1" visible="no" active="no"/>
<layer number="13" name="Route13" color="21" fill="1" visible="no" active="no"/>
<layer number="14" name="Route14" color="22" fill="1" visible="no" active="no"/>
<layer number="15" name="Route15" color="23" fill="1" visible="no" active="no"/>
<layer number="16" name="Bottom" color="1" fill="1" visible="no" active="no"/>
<layer number="17" name="Pads" color="2" fill="1" visible="no" active="no"/>
<layer number="18" name="Vias" color="2" fill="1" visible="no" active="no"/>
<layer number="19" name="Unrouted" color="6" fill="1" visible="no" active="no"/>
<layer number="20" name="Dimension" color="24" fill="1" visible="no" active="no"/>
<layer number="21" name="tPlace" color="7" fill="1" visible="no" active="no"/>
<layer number="22" name="bPlace" color="7" fill="1" visible="no" active="no"/>
<layer number="23" name="tOrigins" color="15" fill="1" visible="no" active="no"/>
<layer number="24" name="bOrigins" color="15" fill="1" visible="no" active="no"/>
<layer number="25" name="tNames" color="7" fill="1" visible="no" active="no"/>
<layer number="26" name="bNames" color="7" fill="1" visible="no" active="no"/>
<layer number="27" name="tValues" color="7" fill="1" visible="no" active="no"/>
<layer number="28" name="bValues" color="7" fill="1" visible="no" active="no"/>
<layer number="29" name="tStop" color="7" fill="3" visible="no" active="no"/>
<layer number="30" name="bStop" color="7" fill="6" visible="no" active="no"/>
<layer number="31" name="tCream" color="7" fill="4" visible="no" active="no"/>
<layer number="32" name="bCream" color="7" fill="5" visible="no" active="no"/>
<layer number="33" name="tFinish" color="6" fill="3" visible="no" active="no"/>
<layer number="34" name="bFinish" color="6" fill="6" visible="no" active="no"/>
<layer number="35" name="tGlue" color="7" fill="4" visible="no" active="no"/>
<layer number="36" name="bGlue" color="7" fill="5" visible="no" active="no"/>
<layer number="37" name="tTest" color="7" fill="1" visible="no" active="no"/>
<layer number="38" name="bTest" color="7" fill="1" visible="no" active="no"/>
<layer number="39" name="tKeepout" color="4" fill="11" visible="no" active="no"/>
<layer number="40" name="bKeepout" color="1" fill="11" visible="no" active="no"/>
<layer number="41" name="tRestrict" color="4" fill="10" visible="no" active="no"/>
<layer number="42" name="bRestrict" color="1" fill="10" visible="no" active="no"/>
<layer number="43" name="vRestrict" color="2" fill="10" visible="no" active="no"/>
<layer number="44" name="Drills" color="7" fill="1" visible="no" active="no"/>
<layer number="45" name="Holes" color="7" fill="1" visible="no" active="no"/>
<layer number="46" name="Milling" color="3" fill="1" visible="no" active="no"/>
<layer number="47" name="Measures" color="7" fill="1" visible="no" active="no"/>
<layer number="48" name="Document" color="7" fill="1" visible="no" active="no"/>
<layer number="49" name="Reference" color="7" fill="1" visible="no" active="no"/>
<layer number="51" name="tDocu" color="7" fill="1" visible="no" active="no"/>
<layer number="52" name="bDocu" color="7" fill="1" visible="no" active="no"/>
<layer number="88" name="SimResults" color="9" fill="1" visible="yes" active="yes"/>
<layer number="89" name="SimProbes" color="9" fill="1" visible="yes" active="yes"/>
<layer number="90" name="Modules" color="5" fill="1" visible="yes" active="yes"/>
<layer number="91" name="Nets" color="2" fill="1" visible="yes" active="yes"/>
<layer number="92" name="Busses" color="1" fill="1" visible="yes" active="yes"/>
<layer number="93" name="Pins" color="2" fill="1" visible="no" active="yes"/>
<layer number="94" name="Symbols" color="4" fill="1" visible="yes" active="yes"/>
<layer number="95" name="Names" color="7" fill="1" visible="yes" active="yes"/>
<layer number="96" name="Values" color="7" fill="1" visible="yes" active="yes"/>
<layer number="97" name="Info" color="7" fill="1" visible="yes" active="yes"/>
<layer number="98" name="Guide" color="6" fill="1" visible="yes" active="yes"/>
<layer number="255" name="Undefined" color="7" fill="1" visible="yes" active="yes"/>
</layers>
<schematic xreflabel="%F%N/%S.%C%R" xrefpart="/%S.%C%R">
<libraries>
<library name="MILL_MAX_0945_SMD" urn="urn:adsk.wipprod:fs.file:vf.dSKtJUQlTnqB1DVnww3Itw">
<packages>
<package name="MILL_MAX_0945_SMD" library_version="5">
<smd name="P$1" x="0" y="0" dx="3.25" dy="3.25" layer="1" roundness="100"/>
</package>
</packages>
<symbols>
<symbol name="OMNIBALL_CONTACT" library_version="3">
<pin name="1" x="0" y="0" length="middle"/>
</symbol>
</symbols>
<devicesets>
<deviceset name="0945-0-15-20-09-14-11-0" library_version="5">
<gates>
<gate name="G$1" symbol="OMNIBALL_CONTACT" x="0" y="0"/>
</gates>
<devices>
<device name="" package="MILL_MAX_0945_SMD">
<connects>
<connect gate="G$1" pin="1" pad="P$1"/>
</connects>
<technologies>
<technology name="">
<attribute name="CATEGORY_L1" value="" constant="no"/>
<attribute name="DATASHEET" value="" constant="no"/>
<attribute name="MANUFACTURER" value="Mill-Max" constant="no"/>
<attribute name="CATEGORY_L2" value="" constant="no"/>
<attribute name="MPN" value="0945-0-15-20-09-14-11-0" constant="no"/>
<attribute name="VALUE" value="OmniBall SMD Contact" constant="no"/>
<attribute name="VENDOR" value="" constant="no"/>
<attribute name="VPN" value="" constant="no"/>
<attribute name="PACKAGE" value="" constant="no"/>
</technology>
</technologies>
</device>
</devices>
</deviceset>
</devicesets>
</library>
</libraries>
<attributes>
</attributes>
<variantdefs>
</variantdefs>
<classes>
<class number="0" name="default" width="0" drill="0">
</class>
</classes>
<parts>
<part name="PIN1" library="MILL_MAX_0945_SMD" library_urn="urn:adsk.wipprod:fs.file:vf.dSKtJUQlTnqB1DVnww3Itw" deviceset="0945-0-15-20-09-14-11-0" device="" value="OmniBall SMD Contact"/>
<part name="PIN2" library="MILL_MAX_0945_SMD" library_urn="urn:adsk.wipprod:fs.file:vf.dSKtJUQlTnqB1DVnww3Itw" deviceset="0945-0-15-20-09-14-11-0" device="" value="OmniBall SMD Contact"/>
<part name="PIN3" library="MILL_MAX_0945_SMD" library_urn="urn:adsk.wipprod:fs.file:vf.dSKtJUQlTnqB1DVnww3Itw" deviceset="0945-0-15-20-09-14-11-0" device="" value="OmniBall SMD Contact"/>
<part name="PIN4" library="MILL_MAX_0945_SMD" library_urn="urn:adsk.wipprod:fs.file:vf.dSKtJUQlTnqB1DVnww3Itw" deviceset="0945-0-15-20-09-14-11-0" device="" value="OmniBall SMD Contact"/>
<part name="PIN6" library="MILL_MAX_0945_SMD" library_urn="urn:adsk.wipprod:fs.file:vf.dSKtJUQlTnqB1DVnww3Itw" deviceset="0945-0-15-20-09-14-11-0" device="" value="OmniBall SMD Contact"/>
<part name="PIN5" library="MILL_MAX_0945_SMD" library_urn="urn:adsk.wipprod:fs.file:vf.dSKtJUQlTnqB1DVnww3Itw" deviceset="0945-0-15-20-09-14-11-0" device="" value="OmniBall SMD Contact"/>
<part name="PIN7" library="MILL_MAX_0945_SMD" library_urn="urn:adsk.wipprod:fs.file:vf.dSKtJUQlTnqB1DVnww3Itw" deviceset="0945-0-15-20-09-14-11-0" device="" value="OmniBall SMD Contact"/>
<part name="PIN8" library="MILL_MAX_0945_SMD" library_urn="urn:adsk.wipprod:fs.file:vf.dSKtJUQlTnqB1DVnww3Itw" deviceset="0945-0-15-20-09-14-11-0" device="" value="OmniBall SMD Contact"/>
</parts>
<sheets>
<sheet>
<plain>
</plain>
<instances>
<instance part="PIN1" gate="G$1" x="-20.32" y="12.7" smashed="yes"/>
<instance part="PIN2" gate="G$1" x="-20.32" y="7.62" smashed="yes"/>
<instance part="PIN3" gate="G$1" x="-7.62" y="12.7" smashed="yes"/>
<instance part="PIN4" gate="G$1" x="-7.62" y="7.62" smashed="yes"/>
<instance part="PIN6" gate="G$1" x="7.62" y="-7.62" smashed="yes" rot="R90"/>
<instance part="PIN5" gate="G$1" x="12.7" y="-7.62" smashed="yes" rot="R90"/>
<instance part="PIN7" gate="G$1" x="12.7" y="-20.32" smashed="yes" rot="R90"/>
<instance part="PIN8" gate="G$1" x="7.62" y="-20.32" smashed="yes" rot="R90"/>
</instances>
<busses>
</busses>
<nets>
<net name="N$1" class="0">
<segment>
<wire x1="-20.32" y1="12.7" x2="-7.62" y2="12.7" width="0.1524" layer="91"/>
<wire x1="-7.62" y1="12.7" x2="12.7" y2="12.7" width="0.1524" layer="91"/>
<junction x="-7.62" y="12.7"/>
<wire x1="12.7" y1="12.7" x2="12.7" y2="-7.62" width="0.1524" layer="91"/>
<wire x1="12.7" y1="-7.62" x2="12.7" y2="-20.32" width="0.1524" layer="91"/>
<junction x="12.7" y="-7.62"/>
<pinref part="PIN1" gate="G$1" pin="1"/>
<pinref part="PIN3" gate="G$1" pin="1"/>
<pinref part="PIN5" gate="G$1" pin="1"/>
<pinref part="PIN7" gate="G$1" pin="1"/>
</segment>
</net>
<net name="N$2" class="0">
<segment>
<wire x1="-20.32" y1="7.62" x2="-7.62" y2="7.62" width="0.1524" layer="91"/>
<wire x1="-7.62" y1="7.62" x2="7.62" y2="7.62" width="0.1524" layer="91"/>
<junction x="-7.62" y="7.62"/>
<wire x1="7.62" y1="7.62" x2="7.62" y2="-7.62" width="0.1524" layer="91"/>
<wire x1="7.62" y1="-7.62" x2="7.62" y2="-20.32" width="0.1524" layer="91"/>
<junction x="7.62" y="-7.62"/>
<pinref part="PIN2" gate="G$1" pin="1"/>
<pinref part="PIN4" gate="G$1" pin="1"/>
<pinref part="PIN6" gate="G$1" pin="1"/>
<pinref part="PIN8" gate="G$1" pin="1"/>
</segment>
</net>
</nets>
</sheet>
</sheets>
</schematic>
</drawing>
<compatibility>
<note version="8.2" severity="warning">
Since Version 8.2, EAGLE supports online libraries. The ids
of those online libraries will not be understood (or retained)
with this version.
</note>
<note version="8.3" severity="warning">
Since Version 8.3, EAGLE supports the association of 3D packages
with devices in libraries, schematics, and board files. Those 3D
packages will not be understood (or retained) with this version.
</note>
</compatibility>
</eagle>
