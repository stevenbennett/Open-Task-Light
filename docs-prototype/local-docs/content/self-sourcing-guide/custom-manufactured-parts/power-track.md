# Power Track

The Power Track is the long, two-conductor PCB that carries 24 V along the rails.

<a href="https://github.com/stevenbennett/Open-Task-Light/tree/main/Open%20Task%20Light/Electronics/Power%20Track" class="button primary" data-icon="github">View PCB files on GitHub</a>

<figure>
<img src="/images/f77644c0a0bf.png" alt="CAD render of the long, thin power track PCB with two parallel copper tracks">
<ol class="callouts">
<li dot="94.5,13.2" label="78,36" qty="1" match="M3 surface-mount standoff" link="Bill of materials: self-sourcing-guide/bill-of-materials">M3 SMD standoff <note>Würth 78614025360, soldered to the pad on the underside at this end.</note></li>
<li dot="4.6,90" label="22,70" qty="1" match="right-angle Micro-Lock connector" link="Bill of materials: self-sourcing-guide/bill-of-materials">Micro-Lock connector <note>Molex 220098-0271 right-angle connector at the other end. Optionally epoxied before soldering.</note></li>
</ol>
</figure>
{% hint style="info" %}
**Required quantity:** 2

Each Power Track uses one M3 surface-mount standoff and one right-angle Micro-Lock connector.
{% endhint %}

## Parts and files

* 2 × Power Track PCB
* 2 × Würth Elektronik 78614025360 M3 surface-mount standoff
* 2 × Molex 220098-0271 right-angle, two-position Micro-Lock connector

The GitHub folder includes the Gerber ZIP for ordering the bare PCB, Fusion Electronics source files, and a BOM. The Power Track is intended for hand assembly, so it does not include placement files.

## Required tools

* Soldering iron
* Solder paste (syringe type)
* Solder
* Tweezers (optional but helpful)
* Two-part epoxy resin (optional to secure the Micro-Lock connector)
* Small paint brush

## Assemble the Power Track

### M3 SMD Standoff

1. Apply solder paste to standoff pad (bottom side of board opposite tracks). Apply small dots around the circular pad. Low temperature solder paste will work.
2. Insert M3 standoff.
3. Heat a soldering iron to the appropriate temperature according to your solder paste. Insert the soldering iron into the middle of the standoff. I like to let the end of the board hang off of a surface for this step.
4. Wait until you see the solder paste melt. It will turn metallic.
5. Use a pair of tweezers to hold the standoff in place as you remove the soldering iron.
6. Allow to cool.

### Micro-Lock Connector - Right Angle

The solder joints are fragile and the connector is exposed on the vertical rail of the finished lamp. All kit connectors are secured in place using epoxy before soldering. **Adhering the connector to the board with epoxy is an optional step. If you choose to do it:**

1. Mix up a very small amount of two part epoxy. I use [this](https://www.amazon.com/dp/B0166FFFS4?ref_=ppx_hzsearch_conn_dt_b_fed_asin_title_7\&th=1) because it adheres to fiberglass
2. Use a small paint brush to paint epoxy onto the bottom of the connector. There are four raised corners which will make contact with the board, so make sure to get some contact on those as well as the two posts that go through the board. **Avoid getting epoxy on the metal pins.** The large flat surface can also be painted with epoxy, but you will have to apply a thick glob for it to touch the board.

<figure><img src="/images/c5eda857d962.png" alt=""></figure>

3. Insert the connector into the board. Ensure that the connector lies flat on the board surface. Clean up any excess epoxy that may have oozed out (check both the top and bottom side of the board)
4. Allow the epoxy to cure.

**Once the connector is adhered to the board (or if you choose to skip this step):**

1. (Insert the connector if you skipped the above steps, then) Apply some liquid flux to the four electrical contact points: two pins on the connector and two holes on the board.
2. Solder each pin.
