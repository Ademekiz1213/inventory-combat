# Inventory Combat Prototype

HTML, CSS ve vanilla JavaScript ile yapılmış oynanabilir **roguelike / inventory puzzle / auto battler** prototipi.

## Özellikler

- 4x4 envanter grid'i
- Drag & drop eşya yerleştirme
- Otomatik savaş sistemi
- Can ve blok hesaplama
- Komşuluk bonusları
- Tooltip sistemi
- Savaş günlüğü
- Savaş sonrası 3 ödülden 1 eşya seçme
- 5 savaşlık kısa run

## Nasıl Çalıştırılır?

Projeyi klonladıktan sonra klasörde basit bir statik sunucu açın:

```bash
python3 -m http.server 8000
```

Sonra tarayıcıda açın:

```text
http://localhost:8000
```

Alternatif olarak `index.html` dosyasını doğrudan tarayıcıda açabilirsiniz.

## Oynanış

1. Eşyaları çantadaki 4x4 grid'e sürükleyin.
2. Güçlendiricileri silahların yanına koyarak sinerji açın.
3. **Savaşı Başlat** butonuna basın.
4. Eşyalar cooldown sürelerine göre otomatik çalışır.
5. Savaşı kazanırsanız 3 ödülden 1 tanesini seçin.
6. 5 savaşı tamamlamaya çalışın.

## Başlangıç Eşyaları

- Kılıç
- Kalkan
- Alev Taşı
- İksir

## Ödül Havuzu

- Hançer
- Balta
- Zırh
- Hız Yüzüğü
- Kan Kristali
- Buz Taşı
- Diken
- Bomba
- Bariyer Taşı

## Geliştirme Fikirleri

- Çok kareli eşyalar
- Eşya döndürme
- Boss mekanikleri
- Mağaza ve altın ekonomisi
- LocalStorage kayıt sistemi
- Mobil optimizasyon
- Ses efektleri

## Lisans

MIT
