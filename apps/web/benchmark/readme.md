# Benchmark

## Case 1

> - Serverless Region: Hong Kong
> - Server: Vercel
> - Runtime: NodeJS

### URL: /b

> - ISR(SSG): 60 Seconds

| SSR                 | SSG                 |
|---------------------|---------------------|
| 583 ms              | 41 ms               |
| 505 ms              | -                   |
| 500 ms              | -                   |
| 418 ms              | -                   |
| 445 ms              | -                   |
| 2.91 s (Cold start) | 1.95 s (Cold start) |

### URL: /b/[b_type]

> - ISR(SSG): 60 Seconds
> - Build time(SSG): 27137 ms (27.137 seconds)
> - Fallback: false
> - URL: /b/lol

| SSR                 | SSG                 |
|---------------------|---------------------|
| 537 ms              | 45 ms               |
| 631 ms              | -                   |
| 517 ms              | -                   |
| 442 ms              | -                   |
| 484 ms              | -                   |
| 2.96 s (Cold start) | 1.55 s (Cold start) |

```bash
[17:46:43.342] web:build: ├ ● /b/[b_type]/ssg (ISR: 60 Seconds) (27137 ms)  495 B           250 kB
[17:46:43.342] web:build: ├   ├ /b/gaming/ssg (1174 ms)
[17:46:43.342] web:build: ├   ├ /b/lol/ssg (1053 ms)
[17:46:43.342] web:build: ├   ├ /b/pokemongo/ssg (1011 ms)
[17:46:43.342] web:build: ├   ├ /b/POE/ssg (985 ms)
[17:46:43.342] web:build: ├   ├ /b/overwatch/ssg (954 ms)
[17:46:43.342] web:build: ├   ├ /b/PUBG/ssg (949 ms)
[17:46:43.342] web:build: ├   ├ /b/steam/ssg (946 ms)
[17:46:43.343] web:build: ├   └ [+38 more paths] (avg 528 ms)
```

### URL: /b/[b_type]/f/[bc_id] (Playlist)

> - URL: /b/lol/f/236214

| SSR                 | SSG  |
|---------------------|------|
| 355 ms              | NaN  |
| 377 ms              | NaN  |
| 1.25 s              | NaN  |
| 334 ms              | NaN  |
| 323 ms              | NaN  |
| 5.57 s (Cold start) | NaN  |

### URL: /b/[b_type]/f/[bc_id] (HTML)

> - URL: /b/lol/f/236221

| SSR                 | SSG |
|---------------------|-----|
| 345 ms              | NaN |
| 370 ms              | NaN |
| 324 ms              | NaN |
| 338 ms              | NaN |
| 443 ms              | NaN |
| 3.53 s (Cold start) | NaN |

## Case 2

> - Serverless Region: Hong Kong
> - Server: Vercel
> - Runtime: Edge Functions

### In progress
