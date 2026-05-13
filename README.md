# Inventory Combat — Cursed Backpack

HTML, CSS ve vanilla JavaScript ile yapılmış oynanabilir **roguelike / inventory puzzle / auto battler** prototipi.

Canlı demo:

https://ademekiz1213.github.io/inventory-combat/

## Güncel Yön: Oyun Arayüzü

Son sürüm web sitesi hissinden çıkarılıp tam ekran bir **fantasy game HUD** görünümüne taşındı:

- Dungeon / arena arka planı
- Üst oyun HUD'u
- Savaş rotası şeridi
- Ortada savaş alanı
- Sol oyuncu, sağ düşman kartı
- Ortada büyü çemberi ve saldırı zamanlayıcısı
- Altta oyun içi inventory console
- Ahşap / metal / altın çerçeveli RPG panel stili

## Aşama 2 — Run Döngüsü

Bu sürüm 2. aşama hedefini oyuna ekler:

- 5 savaşlık net rota: normal savaşlar, elit savaş ve mini boss.
- Minimal durak şeridi: uzun metin yerine ikon + sıra numarası.
- Tüccar durakları: altınla eşya satın alma veya can yenileme.
- 50 kartlık dengeli eşya havuzu: silah, savunma, pasif, tek kullanımlık, güçlendirici ve savaş başı kartları.
- Zorluk dengesi güncellendi: düşman HP/hasar eğrisi artık basit başlangıç kılıcıyla tüm run'ı geçirmeyi cezalandırır.
- Kartlar artık sadece hasar/saniye varyantı değil: zehir, kanama, blok delme, infaz, kırılganlık, zırh kırma, ramp-up hasar, yenilenme ve maksimum can gibi özel mekanikler var.
- Düşmanlar da özel mekanik kazandı: öfkelenme, zırh kırma, blok yenileme, kanama, zehir ve sık eşya kilitleme.
- Her zaferden sonra altın kazanımı.
- Savaş sonrası 3 ganimet kartından 1 eşya seçimi.
- Seçilen eşyanın yedek alana gelmesi ve sonraki savaş öncesi yeniden yerleştirilebilmesi.
- Üst HUD'da mevcut durak ve ödül/progresyon önizlemesi.
- Run sonunda temizlenen savaş, toplam altın ve toplam hasar özeti.

## Özellikler

- 4x4 lanetli çanta / envanter grid'i
- 50 farklı kart/eşya ve kontrollü common → legendary nadirlik eğrisi
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

```bash
python3 -m http.server 8000
```

Sonra:

```text
http://localhost:8000
```

## Oynanış

1. Eşyaları çantadaki 4x4 grid'e sürükleyin.
2. Güçlendiricileri silahların veya savunma eşyalarının yanına koyarak sinerji açın.
3. Aktif sinerji panelinden build'inizi kontrol edin.
4. **Savaşı Başlat** butonuna basın.
5. Eşyalar cooldown sürelerine göre otomatik çalışır.
6. Savaşı kazanırsanız 3 ödülden 1 tanesini seçin.
7. 5 savaşı tamamlamaya çalışın.

## Lisans

MIT
