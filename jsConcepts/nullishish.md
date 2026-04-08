## ?? returns right side ONLY for null/undefined

null ?? "default"      // "default"
undefined ?? "default" // "default"
0 ?? "default"         // 0 ← 0 is NOT null/undefined!
"" ?? "default"        // "" ← "" is NOT null/undefined!
false ?? "default"     // false ← false is NOT null/undefined!