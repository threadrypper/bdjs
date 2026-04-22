# $then

**Description:** Executes a code block if a signal is true.
Returns the result of the code block.

**Usage:**
```
$then[Signal, Code]
```

**Arguments:**

|  Name  |                Description                 |  Type   | Required | Spread |
|--------|--------------------------------------------|---------|----------|--------|
| Signal | The signal to be received.                 | boolean | Yes      | No     |
| Code   | The code to execute if the signal is true. | any     | Yes      | No     |


**Source:** [$then](https://raw.githubusercontent.com/threadrypper/bdjs/1.5/src/functions/then.ts)

