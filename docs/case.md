# $case

**Description:** Executes a block of code if the condition is met.

:::note
This instruction is a builder and can be used only inside **$switch**.

**Usage:**
```
$case[Name, Code]
```

**Arguments:**

| Name |                 Description                  | Type | Required | Spread |
|------|----------------------------------------------|------|----------|--------|
| Name | The name of the case.                        | any  | Yes      | No     |
| Code | The code to execute if the condition is met. | any  | Yes      | No     |


**Source:** [$case](https://raw.githubusercontent.com/threadrypper/bdjs/1.5/src/functions/case.ts)

