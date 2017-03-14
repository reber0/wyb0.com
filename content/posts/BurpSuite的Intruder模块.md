+++
date = "2016-08-01T09:17:38+08:00"
description = ""
draft = false
tags = ["软件", "burpsuite"]
title = "BurpSuite的Intruder模块"
topics = ["Pentest"]

+++

### 0x00 示例一
> {{% fluid_img src="/img/post/burpsuite_intruder_caught.png" alt="burpsuite抓包发送给intruder模块" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder_attack_type1.png" alt="burpsuite的intruder模块的攻击类型1" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder_attack_type2.png" alt="burpsuite的intruder模块的攻击类型2" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder_payload_set.png" alt="burpsuite的intruder模块payload设置" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder_payload_set_variable1.png" alt="burpsuite的intruder模块payload设置变量1" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder_payload_set_variable2.png" alt="burpsuite的intruder模块payload设置变量2" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder_payload_processing_rule.png" alt="burpsuite的intruder模块payload设置的特殊处理" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder_start_attack.png" alt="burpsuite的intruder模块开始攻击" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder_attack_interface.png" alt="burpsuite的intruder攻击界面" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder_screening_attack_results.png" alt="burpsuite的intruder筛选攻击结果" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder_attack_results.png" alt="burpsuite的intruder筛选后的攻击结果" %}}

### 0x01 示例二
> {{% fluid_img src="/img/post/burpsuite_intruder1.png" alt="burpsuite的intruder1" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder2.png" alt="burpsuite的intruder2" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder3.png" alt="burpsuite的intruder3" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder4.png" alt="burpsuite的intruder4" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder5.png" alt="burpsuite的intruder5" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder6.png" alt="burpsuite的intruder6" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder7.png" alt="burpsuite的intruder7" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_intruder8.png" alt="burpsuite的intruder8" %}}