import React from 'react';
import {Icons} from "@/components/icons";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

function Page(props) {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Let&apos;s Learn About KnowledgeForge.
        </h2>
        <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
          KnowledgeForge is a platform for learning and teaching online
        </p>
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla placerat odio quis suscipit. Aliquam
        interdum congue felis, sit amet congue magna condimentum sit amet. Sed bibendum nulla quis dui vehicula
        imperdiet. Sed vitae orci vulputate, consequat tortor id, finibus ante. Duis elementum sollicitudin quam sed
        tempor. Nullam a felis id sapien posuere aliquet. Sed quis orci nibh. Etiam in enim id nibh laoreet semper.
        Mauris scelerisque elit mauris, in varius elit rhoncus in.

        Aliquam iaculis leo est, ac iaculis leo imperdiet et. Donec eu consectetur ex. Aliquam sollicitudin nibh nisl,
        nec faucibus dolor facilisis ut. Vivamus vehicula ligula a justo feugiat, et molestie lacus scelerisque. Mauris
        aliquet nunc ac nunc blandit suscipit. Duis aliquam sodales turpis, et convallis dolor. Suspendisse hendrerit
        convallis tellus, faucibus faucibus turpis venenatis sit amet. Praesent eu nisi id est sollicitudin tincidunt.
        Ut cursus hendrerit magna, a volutpat lorem mollis suscipit. In imperdiet risus a fermentum luctus. Nam porta
        justo ac neque mattis pharetra. Sed scelerisque diam non nunc fermentum semper. Ut interdum iaculis porta.
        Suspendisse pulvinar a mi non lobortis.

        Curabitur elementum dolor vel commodo faucibus. Mauris hendrerit lorem eget tellus molestie semper. Nullam
        iaculis justo cursus libero condimentum pretium. Maecenas nec quam arcu. Maecenas varius mi a cursus rutrum.
        Nunc sapien purus, gravida non dolor ut, semper sollicitudin mi. Fusce at consequat magna. Sed consectetur sed
        tellus at luctus.

        Proin eu felis non risus dignissim vehicula. Duis in faucibus metus. Nullam facilisis libero ornare libero
        faucibus, non luctus dui congue. Fusce sollicitudin, mauris eget dignissim lobortis, arcu tellus semper mauris,
        vitae condimentum ligula leo eget velit. Aenean a justo mi. Nam gravida pellentesque pellentesque. Praesent
        fringilla suscipit bibendum. Aenean sit amet erat egestas, faucibus nulla et, molestie purus. Donec ut eros
        lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Pellentesque lobortis aliquet imperdiet. Aenean ornare leo fringilla sem viverra, sed aliquam risus semper.
        Quisque eleifend ex tellus, sed dictum arcu rhoncus vel. Nam nec risus ligula. Phasellus ut elementum quam, at
        faucibus enim. Duis ac eleifend augue, sit amet consequat risus.

        Etiam suscipit lectus ut lacus vestibulum, eu cursus neque suscipit. Quisque rhoncus eget lacus sit amet
        ultricies. Integer tortor libero, dictum sit amet ullamcorper quis, dignissim luctus eros. Nullam vel risus ex.
        Curabitur tortor nunc, ultricies et pharetra at, suscipit at risus. Duis venenatis nibh sed purus venenatis
        tincidunt. Nulla facilisi. Praesent at dui lacus. Sed eu pellentesque lectus, ut varius mi. In molestie euismod
        augue, a egestas metus vestibulum sed. Nunc vel ligula nec nunc pellentesque pharetra.

        Pellentesque nec fermentum purus. Integer laoreet, eros vel aliquet molestie, augue lorem finibus arcu, eu
        vehicula urna ex vitae mi. Aenean elementum nec tellus ac malesuada. Interdum et malesuada fames ac ante ipsum
        primis in faucibus. Quisque fermentum neque sed nulla auctor convallis. Sed consectetur sollicitudin risus.
        Vestibulum scelerisque faucibus libero. Maecenas auctor augue nisi, in finibus turpis molestie at. Proin pretium
        luctus lorem sit amet varius.

        Vivamus id velit ut nisl laoreet porta. Vestibulum massa ipsum, sollicitudin at fermentum id, congue eget diam.
        Quisque eget ultrices turpis. Quisque a turpis venenatis, iaculis nisi eget, pretium dui. Suspendisse finibus
        tristique nunc, non tincidunt purus lacinia eget. Proin et erat nec mi dignissim ultrices. Sed at magna
        venenatis, tincidunt ante euismod, efficitur turpis. In eget elit erat.

        Nulla lacus mi, placerat quis gravida vel, euismod vel nibh. Duis accumsan ipsum vel velit euismod euismod. Nunc
        eu magna lectus. Nullam vel lectus felis. Donec aliquet condimentum porta. Vivamus ex neque, sollicitudin eu
        gravida in, dapibus eget mi. Phasellus metus mi, tincidunt id ligula ornare, ullamcorper volutpat dui. Duis et
        varius neque. In vel lacus nulla. Sed sit amet velit tincidunt, imperdiet felis in, euismod ante. Mauris sed
        consectetur neque.

        In eget imperdiet nibh. Nam volutpat elit sed purus ultricies ultrices. Maecenas mattis vehicula scelerisque. Ut
        eros libero, suscipit sed lectus ac, maximus malesuada quam. Pellentesque varius lacinia odio id convallis. Sed
        in turpis non felis sollicitudin malesuada quis et nibh. Etiam blandit sem neque, ut egestas tortor fermentum
        sit amet. Nulla elementum pellentesque nulla eget varius. Maecenas pharetra, est id condimentum egestas, tortor
        nulla varius libero, et suscipit lorem lorem at ipsum. Pellentesque habitant morbi tristique senectus et netus
        et malesuada fames ac turpis egestas.

        Praesent pulvinar tincidunt tortor ac luctus. Duis imperdiet tellus in egestas blandit. Donec elementum sagittis
        ex, id iaculis est tristique vitae. Sed turpis risus, commodo ac urna nec, gravida ornare est. Phasellus at
        eleifend tellus. Aenean leo lectus, varius at gravida quis, vehicula et quam. Vivamus lacinia porta dui, eget
        pulvinar lorem tincidunt ut. Suspendisse finibus velit imperdiet massa feugiat, ut ornare elit commodo. Fusce
        turpis eros, euismod id libero a, posuere tempor massa. Integer rutrum mauris at ante tristique ornare. In mi
        ex, suscipit vel eros a, lobortis rutrum tortor. Sed efficitur diam in lorem sodales, nec euismod urna volutpat.
        In euismod magna odio.

        Etiam mattis sit amet metus in dignissim. Sed aliquam sem lacus, a rutrum velit gravida quis. Pellentesque
        pellentesque aliquet ultricies. Maecenas malesuada nulla tempor tellus facilisis feugiat. Mauris laoreet
        convallis viverra. Nulla porta dapibus lacus, nec congue lorem mattis ut. Aenean blandit tempus felis placerat
        imperdiet.

        Nam ac feugiat erat, et feugiat diam. Donec est neque, faucibus in risus tristique, aliquam rutrum lacus. Nulla
        viverra nunc quis vulputate congue. Nunc a ex consectetur, pulvinar magna eu, interdum purus. Sed vel bibendum
        urna. Aenean venenatis eget ex sit amet tristique. Cras luctus ac ipsum nec pharetra.

        Praesent pulvinar elit et laoreet egestas. Aenean commodo semper urna, ac semper magna. Sed congue tincidunt
        risus, sed imperdiet purus bibendum eget. Nunc id odio ac quam finibus mollis. Phasellus mauris leo, dignissim a
        faucibus in, scelerisque at metus. Nullam placerat felis ac gravida mattis. Aliquam ultrices ex nec dui
        ullamcorper, a maximus lorem eleifend. In commodo diam elementum tortor malesuada volutpat. Quisque luctus
        tellus nec lacus dictum eleifend. Ut eu bibendum sem.

        Nunc sit amet tincidunt augue. Praesent at maximus quam, id facilisis justo. Ut dignissim fermentum dui, ut
        ultrices dolor hendrerit quis. Pellentesque ante felis, tempor at lorem ut, ornare auctor neque. Morbi
        condimentum porta malesuada. Aenean eleifend gravida neque, vitae bibendum augue sodales nec. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Pellentesque imperdiet commodo cursus. Praesent convallis tincidunt
        neque, id luctus ligula facilisis consectetur. Pellentesque dolor tortor, ornare maximus tincidunt at, pulvinar
        at mi. Quisque gravida ipsum sit amet porttitor semper. Duis pulvinar sem lacus, ac accumsan risus viverra eget.
        Nunc sed mollis justo. Quisque nec ullamcorper justo. Donec dignissim justo non pharetra egestas.
      </p>

    </section>
  );
}

export default Page;
