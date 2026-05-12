# Inventory Combat — Cursed Backpack

HTML, CSS ve vanilla JavaScript ile yapılmış oynanabilir **roguelike / inventory puzzle / auto battler** prototipi.

Canlı demo:

https://ademekiz1213.github.io/inventory-combat/

## Profesyonel Sürümdeki Özellikler

- Premium koyu tema, glass panel UI ve modern oyun HUD tasarımı
- 4x4 lanetli çanta / envanter grid'i
- Drag & drop eşya yerleştirme
- Otomatik savaş sistemi
- Can, blok ve zehir göstergeleri
- Düşman niyet kartı ve saldırı zamanlayıcı orb'u
- Komşuluk bonusları ve aktif sinerji paneli
- Cooldown barlı item kartları
- Floating damage/heal/block sayıları
- Savaş günlüğü
- Run rotası / savaş ilerleme çizgisi
- Savaş sonrası 3 ödülden 1 eşya seçme
- 1x / 1.5x / 2x savaş hızı
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
2. Güçlendiricileri silahların veya savunma eşyalarının yanına koyarak sinerji açın.
3. Aktif sinerji panelinden build'inizi kontrol edin.
4. **Savaşı Başlat** butonuna basın.
5. Eşyalar cooldown sürelerine göre otomatik çalışır.
6. Savaşı kazanırsanız 3 ödülden 1 tanesini seçin.
7. 5 savaşı tamamlamaya çalışın.

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
- Boss özel animasyonları
- Mağaza ve altın ekonomisi
- LocalStorage kayıt sistemi
- Mobil drag/drop iyileştirmeleri
- Ses efektleri ve müzik
- Sprite asset paketi

## Lisans

MIT
